// state-provider.ts
import { Inject, Injectable, InjectionToken } from '@angular/core';

export const LOCAL_STORAGE_KEY = new InjectionToken<string>('LOCAL_STORAGE_KEY');
export const USE_BASE64_ENCODING = new InjectionToken<boolean>('USE_BASE64_ENCODING');

export interface RootState {
  root: true;
  key: string;          // ex: ui-TipocategoriaShellComponent
  tabId: string;        // ex: 1222 (ou uuid)
  dtUpdate: Date;
  dict: Record<string, ChildState>;
}

export interface ChildState {
  componentKey: string; // ex: TipocategoriaListPage#main
  value: any;           // shape livre
  linkedTo?: string;    // ex: "TipocategoriaFilterPage.value.filter"
}

//@Injectable({ providedIn: 'any' }) // instancia por shell (escopo de componente)
@Injectable({
  providedIn: 'root'
})
export class StateProvider {
  private states = new Map<string, RootState>();

  constructor(
    @Inject(LOCAL_STORAGE_KEY) private storageKey: string,
    @Inject(USE_BASE64_ENCODING) private useBase64: boolean = true
  ) {
    this.loadStateFromStorage();
    // limpeza automática a cada 5 minutos
    setInterval(() => this.cleanupExpiredStates(20), 5 * 60 * 1000);
  }

  // ---------- helpers encoding (base64 ou string) ----------
  private encode(value: any): string {
    const json = JSON.stringify(value, null, this.useBase64 ? 0 : 2);
    return this.useBase64 ? btoa(encodeURIComponent(json)) : json;
  }

  private decode<T>(value: string | null): T | null {
    if (!value) return null;
    try {
      const json = this.useBase64 ? decodeURIComponent(atob(value)) : value;
      return JSON.parse(json) as T;
    } catch {
      return null;
    }
  }

  // ---------- ROOT ----------
  ensureRoot(key: string, tabId?: string) {
    const exists = this.states.get(key);
    if (exists) {
      this.touch(key);
      return;
    }
    this.createRoot(key, tabId ?? this.newTabId());
  }

  createRoot(key: string, tabId: string) {
    const root: RootState = {
      root: true,
      key,
      tabId,
      dtUpdate: new Date(),
      dict: {}
    };
    this.states.set(key, root);
    this.saveStateToStorage();
  }

  clearRoot(key: string) {
    const root = this.guardRoot(key);
    root.dict = {};
    root.dtUpdate = new Date();
    this.saveStateToStorage();
  }

  removeRoot(key: string) {
    if (this.states.delete(key)) this.saveStateToStorage();
  }

  closeAllChildRoots(parentKey: string) {
    Array.from(this.states.keys())
      .filter(k => k.startsWith(parentKey + ':'))
      .forEach(k => this.states.delete(k));
    this.saveStateToStorage();
  }

  // ---------- CHILD ROOTS (popups/overlays) ----------
  createChildRoot(parentKey: string, childId: string, suffix = 'popup'): string {
    const parent = this.guardRoot(parentKey);
    const newKey = `${parentKey}:${suffix}:${childId}`;
    const childRoot: RootState = {
      root: true,
      key: newKey,
      tabId: parent.tabId,
      dtUpdate: new Date(),
      dict: {}
    };
    this.states.set(newKey, childRoot);
    this.saveStateToStorage();
    return newKey;
  }

  // ---------- CHILD ----------
  setChild(masterKey: string, componentKey: string, value: any, linkedTo?: string) {
    const root = this.guardRoot(masterKey);
    root.dict[componentKey] = { componentKey, value, linkedTo };
    root.dtUpdate = new Date();
    this.saveStateToStorage();
  }

  updateChildValue(masterKey: string, componentKey: string, patch: any) {
    const { dict } = this.guardRoot(masterKey);
    const child = this.guardChild(dict, componentKey);
    child.value = { ...(child.value ?? {}), ...patch };
    this.touch(masterKey);
  }

  updateChildLinkedTo(masterKey: string, componentKey: string, linkedTo?: string) {
    const { dict } = this.guardRoot(masterKey);
    const child = this.guardChild(dict, componentKey);
    child.linkedTo = linkedTo;
    this.touch(masterKey);
  }

  removeChild(masterKey: string, componentKey: string) {
    const root = this.guardRoot(masterKey);
    delete root.dict[componentKey];
    this.touch(masterKey);
  }

  // ---------- GET ----------
  getChild<T>(masterKey: string, componentKey: string): T | null {
    const root = this.states.get(masterKey);
    const v = root?.dict[componentKey]?.value;
    return (v ?? null) as T | null;
  }

  /** linkedTo aceita caminho com ponto, ex: "TipocategoriaFilterPage.value.filter" */
  getLinked<T>(masterKey: string, componentKey: string): T | null {
    const root = this.states.get(masterKey);
    const child = root?.dict[componentKey];
    if (!root || !child?.linkedTo) return null;
    return this.resolvePath<T>(root, child.linkedTo);
  }

  getRoot(key: string): RootState | null {
    return this.states.get(key) ?? null;
  }

  // ---------- CLEANUP ----------
  cleanupExpiredStates(ttlMinutes = 20) {
    const now = Date.now();
    const expired: string[] = [];
    this.states.forEach((state, key) => {
      const diff = (now - state.dtUpdate.getTime()) / 60000;
      if (diff > ttlMinutes) expired.push(key);
    });
    if (expired.length) {
      expired.forEach(k => this.states.delete(k));
      this.saveStateToStorage();
      console.log(`[StateProvider] Limpou ${expired.length} roots expirados`);
    }
  }

  // ---------- internals ----------
  private newTabId() {
    return (crypto?.randomUUID?.() ?? Math.random().toString(36).slice(2));
  }

  private touch(key: string) {
    const root = this.states.get(key);
    if (root) {
      root.dtUpdate = new Date();
      this.saveStateToStorage();
    }
  }

  private guardRoot(key: string): RootState {
    const root = this.states.get(key);
    if (!root) throw new Error(`Root ${key} não existe`);
    return root;
  }

  private guardChild(dict: Record<string, ChildState>, componentKey: string): ChildState {
    const child = dict[componentKey];
    if (!child) throw new Error(`Child ${componentKey} não existe no root`);
    return child;
  }

  /** Resolve "Comp.value.x.y" partindo do root.dict */
  private resolvePath<T>(root: RootState, link: string): T | null {
    const [compKey, ...path] = link.split('.');
    const base = root.dict[compKey];
    if (!base) return null;
    const start: any = path.length && path[0] === 'value' ? base.value : base;
    const obj = (path.length ? path.slice(path[0] === 'value' ? 1 : 0) : ['value'])
      .reduce<any>((acc, k) => (acc == null ? acc : acc[k]), start);
    return (obj ?? null) as T | null;
  }

  // ---------- persistência ----------
  private saveStateToStorage() {
    const obj: any = {};
    this.states.forEach((value, key) => {
      obj[key] = { ...value, dtUpdate: value.dtUpdate.toISOString() };
    });
    localStorage.setItem(this.storageKey, this.encode(obj));
  }

  private loadStateFromStorage() {
    const decoded = this.decode<Record<string, Omit<RootState, 'dtUpdate'> & { dtUpdate: string }>>(
      localStorage.getItem(this.storageKey)
    );
    if (!decoded) return;
    this.states = new Map(
      Object.entries(decoded).map(([k, v]) => [
        k,
        { ...v, dtUpdate: new Date(v.dtUpdate) } as RootState
      ])
    );
  }
}
