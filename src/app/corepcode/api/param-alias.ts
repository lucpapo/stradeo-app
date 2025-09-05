// corepcode/api/param-alias.ts
import { HttpParams } from '@angular/common/http';

export type ApiMode = 'modern' | 'legacy';

export type ListQuery<TFilters extends Record<string, any> = Record<string, any>> = {
  page?: number;
  pageSize?: number;
  sort?: string | string[];           // opcional
  filters?: TFilters;                  // << QUALQUER JSON AQUI
};

export type AliasMap<TFilters> = Partial<
  Record<
    keyof TFilters & string,
    | string
    | ((
        value: any
      ) =>
        | null
        | undefined
        | Record<string, string | number | boolean | Date | (string | number | boolean | Date)[]>
        | [string, string | number | boolean | Date | (string | number | boolean | Date)[]])
  >
>;

export type SerializeOptions = {
  array?: 'repeat' | 'comma';         // default: repeat => ?tag=a&tag=b
  bool?: 'trueFalse' | 'oneZero';     // default: trueFalse
  date?: 'iso' | 'date' | 'epoch';    // default: iso
};

function toStr(
  v: any,
  opt: SerializeOptions
): string {
  if (v instanceof Date) {
    if (opt.date === 'date') return v.toISOString().slice(0, 10);
    if (opt.date === 'epoch') return String(Math.floor(v.getTime() / 1000));
    return v.toISOString();
  }
  if (typeof v === 'boolean') {
    return opt.bool === 'oneZero' ? (v ? '1' : '0') : String(v);
  }
  return String(v);
}

function setParam(p: HttpParams, k: string, v: any, opt: SerializeOptions): HttpParams {
  if (Array.isArray(v)) {
    if (opt.array === 'comma') {
      return p.set(k, v.map(x => toStr(x, opt)).join(','));
    }
    // repeat
    v.forEach(x => (p = p.append(k, toStr(x, opt))));
    return p;
  }
  return p.set(k, toStr(v, opt));
}

export function buildListParams<TFilters extends Record<string, any> = Record<string, any>>(
  mode: ApiMode,
  q?: ListQuery<TFilters>,
  aliases?: AliasMap<TFilters>,
  serialize: SerializeOptions = {}
): HttpParams {
  const opt: SerializeOptions = {
    array: serialize.array ?? 'repeat',
    bool: serialize.bool ?? 'trueFalse',
    date: serialize.date ?? 'iso',
  };

  let p = new HttpParams();
  if (!q) return p;

  // paginação
  if (q.page != null)
    p = p.set(mode === 'legacy' ? 'pag' : 'page', String(q.page));
  if (q.pageSize != null)
    p = p.set(mode === 'legacy' ? 'qtdreg' : 'pageSize', String(q.pageSize));

  // sort (opcional)
  if (q.sort != null) {
    const key = mode === 'legacy' ? 'ordenar' : 'sort';
    const vals = Array.isArray(q.sort) ? q.sort : [q.sort];
    if (opt.array === 'comma') p = p.set(key, vals.join(','));
    else vals.forEach(v => (p = p.append(key, v)));
  }

  // filtros arbitrários
  const f = q.filters as Record<string, any> | undefined;
  if (!f) return p;

  for (const [key, raw] of Object.entries(f)) {
    const val = raw as any;
    if (val === undefined || val === null || val === '') continue;

    const a = aliases?.[key as keyof TFilters & string];
    if (typeof a === 'function') {
      const out = a(val);
      if (!out) continue;

      if (Array.isArray(out)) {
        const [k, v] = out;
        p = setParam(p, k, v, opt);
      } else {
        for (const [k, v] of Object.entries(out)) {
          p = setParam(p, k, v as any, opt);
        }
      }
      continue;
    }

    const finalKey = (typeof a === 'string' ? a : key) as string;
    p = setParam(p, finalKey, val, opt);
  }

  return p;
}
