// src/app/corepcode/api/api-types.ts
export type EnvelopeModern<T> = { data: T; total?: number; message?: string; ok?: boolean };
export type EnvelopeLegacy<T> = { dados: T; totalRegistros?: number; mensagem?: string; error?: boolean };
export type AnyResponse<T> = T | EnvelopeModern<T> | EnvelopeLegacy<T>;

export function unwrapItem<T>(res: AnyResponse<T>): T {
  if (res && typeof res === 'object') {
    const r = res as EnvelopeModern<T> & EnvelopeLegacy<T>;
    if ('data' in r && r.data !== undefined) return r.data as T;
    if ('dados' in r && r.dados !== undefined) return r.dados as T;
  }
  return res as T;
}

export function unwrapList<T>(res: AnyResponse<T[]>): { data: T[]; total?: number } {
  if (res && typeof res === 'object') {
    const r = res as EnvelopeModern<T[]> & EnvelopeLegacy<T[]>;
    if ('data' in r && Array.isArray(r.data)) return { data: r.data, total: r.total };
    if ('dados' in r && Array.isArray(r.dados)) return { data: r.dados, total: r.totalRegistros };
  }
  return { data: res as T[] };
}
