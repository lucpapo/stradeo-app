import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
// As importações dos seus tipos de API e utilitários
import { AnyResponse, unwrapItem, unwrapList } from './api-types';
import { ApiMode, ListQuery, AliasMap, SerializeOptions, buildListParams } from './param-alias';
import { KeyInput, buildKeySegment } from './key.util';
import { IServiceBase } from './IServiceBase';
// 1. Importar a interface que vamos implementar

/**
 * Classe base abstrata para serviços CRUD.
 * Agora implementa formalmente a IServiceBase para garantir a consistência do contrato.
 */
export abstract class BaseService<
  TItem,
  TFilter extends Record<string, any>, // 2. Adicionar TFilter aos genéricos da classe
  TKey extends KeyInput = number
>
  // 3. Implementar a interface
  implements IServiceBase<TItem, TFilter, TKey> {
  constructor(
    protected readonly http: HttpClient,
    private readonly baseUrl: string,
    private readonly mode: ApiMode = 'modern',
    private readonly keyMode: 'path' | 'b64' = 'path'
  ) { }

  protected idSeg(key: TKey): string {
    return buildKeySegment(key, this.keyMode);
  }

  // Método padrão - DINÂMICO (mais usado para velocidade de desenvolvimento)
  list(
    query?: ListQuery<TFilter>,
    options?: { aliases?: AliasMap<TFilter>; serialize?: SerializeOptions }
  ): Observable<{ data: any[]; total?: number }> {
    const params = buildListParams<TFilter>(this.mode, query, options?.aliases, options?.serialize);
    return this.http.get<AnyResponse<any[]>>(this.baseUrl, { params }).pipe(map(unwrapList));
  }

  // Método tipado - quando precisar de type safety
  listTyped(
    query?: ListQuery<TFilter>,
    options?: { aliases?: AliasMap<TFilter>; serialize?: SerializeOptions }
  ): Observable<{ data: TItem[]; total?: number }> {
    const params = buildListParams<TFilter>(this.mode, query, options?.aliases, options?.serialize);
    return this.http.get<AnyResponse<TItem[]>>(this.baseUrl, { params }).pipe(map(unwrapList));
  }

  // Método padrão - DINÂMICO (aceita qualquer estrutura de retorno)
  get<R = any>(key: TKey): Observable<R> {
    return this.http.get<AnyResponse<R>>(`${this.baseUrl}/${this.idSeg(key)}`).pipe(map(unwrapItem));
  }

  // Método tipado - quando precisar de type safety
  getTyped(key: TKey): Observable<TItem> {
    return this.http.get<AnyResponse<TItem>>(`${this.baseUrl}/${this.idSeg(key)}`).pipe(map(unwrapItem));
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
