// src/app/corepcode/api/key.util.ts
export type CompositeKey = Record<string, string | number>;
export type KeyInput = string | number | CompositeKey;

function sortObjKeys<T extends object>(obj: T): T {
  return Object.keys(obj).sort().reduce((acc, k) => ((acc as any)[k] = (obj as any)[k], acc), {} as T);
}

export function keyToPath(key: KeyInput): string {
  if (key !== null && typeof key === 'object' && !Array.isArray(key)) {
    const obj = sortObjKeys(key as CompositeKey);
    return Object.keys(obj).map(k => String((obj as CompositeKey)[k]!)).join('/');
  }
  return String(key);
}

export function encodeKeyToken(key: KeyInput): string {
  const normalized = (key !== null && typeof key === 'object' && !Array.isArray(key))
    ? sortObjKeys(key as CompositeKey)
    : key;
  const json = JSON.stringify(normalized);
  const bytes = new TextEncoder().encode(json);
  let bin = ''; bytes.forEach(b => bin += String.fromCharCode(b));
  return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

export function decodeKeyToken<T = KeyInput>(token: string): T {
  const pad = token.length % 4 === 0 ? '' : '='.repeat(4 - (token.length % 4));
  const b64 = token.replace(/-/g, '+').replace(/_/g, '/') + pad;
  const bin = atob(b64);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  const json = new TextDecoder().decode(bytes);
  return JSON.parse(json) as T;
}

export function buildKeySegment(key: KeyInput, mode: 'path' | 'b64' = 'path'): string {
  return mode === 'b64' ? encodeKeyToken(key) : keyToPath(key);
}
