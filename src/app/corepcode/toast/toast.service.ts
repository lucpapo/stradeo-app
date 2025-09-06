import { Injectable, signal } from '@angular/core';
import { ToastItem, ToastPosition, ToastType } from './toast.model';

let _seq = 0;
const nextId = () => `toast_${Date.now()}_${_seq++}`;

@Injectable({ providedIn: 'root' })
export class ToastService {
  private _toasts = signal<ToastItem[]>([]);
  readonly toasts = this._toasts.asReadonly();

  /** Configurações */
  private readonly tickMs = 100;                 // resolução do progresso (ms)
  private _maxPerPosition = 3;                   // limite por posição (global)
  setMaxPerPosition(n: number) { this._maxPerPosition = Math.max(1, n); }

  /** Loop de atualização do progresso/autofechamento */
  private tickHandle: any;

  constructor() {
    this.tickHandle = setInterval(() => this.tick(), this.tickMs);
  }

  /** Cria/mostra um toast */
  show(message: string, options?: Partial<Omit<ToastItem, 'id' | 'message' | 'createdAt' | 'remaining' | 'paused'>>) {
    const delay = options?.delay ?? 5000;
    const t: ToastItem = {
      id: nextId(),
      message,
      title: options?.title,
      type: options?.type ?? 'default',
      position: options?.position ?? 'top-end',
      autohide: options?.autohide ?? true,
      delay,
      remaining: delay,
      paused: false,
      dismissible: options?.dismissible ?? true,
      createdAt: Date.now(),
    };

    // A adição do novo toast e a verificação do limite devem ser atômicas
    // para evitar condições de corrida com `tick()` e `close()`.
    // A lógica de `enforceLimit` foi movida para dentro desta operação `update`.
    this._toasts.update(list => {
      // 1. Adiciona o novo toast no início da lista.
      const newList = [t, ...list];

      // 2. Filtra os toasts para a posição do novo toast.
      const toastsInPosition = newList.filter(item => item.position === t.position);

      // 3. Se o limite foi excedido, remove os mais antigos daquela posição.
      if (toastsInPosition.length > this._maxPerPosition) {
        const idsToRemove = new Set(toastsInPosition.slice(this._maxPerPosition).map(item => item.id));
        return newList.filter(item => !idsToRemove.has(item.id));
      }

      return newList;
    });
    return t.id;
  }

  success(msg: string, opt?: Partial<ToastItem>) { return this.show(msg, { ...opt, type: 'success' }); }
  info(msg: string, opt?: Partial<ToastItem>)    { return this.show(msg, { ...opt, type: 'info' }); }
  warning(msg: string, opt?: Partial<ToastItem>) { return this.show(msg, { ...opt, type: 'warning' }); }
  danger(msg: string, opt?: Partial<ToastItem>)  { return this.show(msg, { ...opt, type: 'danger' }); }

  /** Fecha individualmente */
  close(id: string) {
    this._toasts.update(list => list.filter(t => t.id !== id));
  }

  /** Fecha todos */
  closeAll() {
    this._toasts.set([]);
  }

  /** Pausar/retomar (usar no hover) */
  pause(id: string, paused: boolean) {
    // Atualiza o estado de 'paused' de forma imutável para evitar efeitos colaterais.
    this._toasts.update(list =>
      list.map(t => (t.id === id ? { ...t, paused } : t))
    );
  }

  /** Progresso em % (0..100) */
  progressPct(t: ToastItem): number {
    if (!t.autohide || t.delay <= 0) return 0;
    const done = 1 - (t.remaining / t.delay);
    return Math.max(0, Math.min(100, Math.round(done * 100)));
  }

  /** Atualiza tempos restantes e auto-fecha */
  private tick() {
    this._toasts.update(list => {
      // Otimização: se não há nada para fazer, retorna a lista original para evitar atualizações.
      if (list.every(t => !t.autohide || t.paused || t.remaining <= 0)) {
        return list;
      }

      // Envolve toda a lógica de leitura-modificação-escrita dentro de `update`
      // para garantir atomicidade e prevenir "race conditions" com o método `close`.
      const updatedList = list.map(t => {
        if (!t.autohide || t.paused || t.remaining <= 0) return t;
        return { ...t, remaining: Math.max(0, t.remaining - this.tickMs) };
      });

      return updatedList.filter(t => !(t.autohide && t.remaining <= 0));
    });
  }
}
