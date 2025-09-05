// corepcode/api/base.service.ts
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { AnyResponse, unwrapItem, unwrapList } from './api-types';
import { ApiMode, ListQuery, AliasMap, SerializeOptions, buildListParams } from './param-alias';
import { KeyInput, buildKeySegment } from './key.util';

export abstract class BaseService<TItem, TKey extends KeyInput = number> {
  constructor(
    protected readonly http: HttpClient,
    private readonly baseUrl: string,
    private readonly mode: ApiMode = 'modern',
    private readonly keyMode: 'path' | 'b64' = 'path'
  ) {}

  protected idSeg(key: TKey): string {
    return buildKeySegment(key, this.keyMode);
  }

  list<R = TItem, TFilters extends Record<string, any> = Record<string, any>>(
    query?: ListQuery<TFilters>,
    options?: { aliases?: AliasMap<TFilters>; serialize?: SerializeOptions }
  ): Observable<{ data: R[]; total?: number }> {
    const params = buildListParams<TFilters>(this.mode, query, options?.aliases, options?.serialize);
    return this.http.get<AnyResponse<R[]>>(this.baseUrl, { params }).pipe(map(unwrapList));
  }

  get<R = TItem>(key: TKey): Observable<R> {
    return this.http.get<AnyResponse<R>>(`${this.baseUrl}/${this.idSeg(key)}`).pipe(map(unwrapItem));
  }

  create<R = TItem>(payload: Partial<TItem>): Observable<R> {
    return this.http.post<AnyResponse<R>>(this.baseUrl, payload).pipe(map(unwrapItem));
  }

  update<R = TItem>(key: TKey, payload: Partial<TItem>): Observable<R> {
    return this.http.put<AnyResponse<R>>(`${this.baseUrl}/${this.idSeg(key)}`, payload).pipe(map(unwrapItem));
  }

  delete(key: TKey): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${this.idSeg(key)}`);
  }
}
