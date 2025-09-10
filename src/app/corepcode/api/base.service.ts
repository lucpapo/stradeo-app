import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';
// As importações dos seus tipos de API e utilitários
import { AnyResponse, unwrapItem, unwrapList } from './api-types';
import { ApiMode, ListQuery, AliasMap, SerializeOptions, buildListParams } from './param-alias';
import { KeyInput, buildKeySegment } from './key.util';
import { IServiceBase } from './IServiceBase';

/**
 * Classe base abstrata para serviços CRUD.
 */
export abstract class BaseService<
  TItem,
  TFilter extends Record<string, any>,
  TKey extends KeyInput = number
>
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

  // ====================================================================
  // MÉTODO LIST() MODIFICADO E FINAL
  // ====================================================================
  list(
    query?: ListQuery<TFilter>,
    options?: { aliases?: AliasMap<TFilter>; serialize?: SerializeOptions }
  ): Observable<{ data: any[]; total?: number }> {
      console.log('[TRACE 6] Dados recebidos no BaseService antes de buildListParams:', JSON.parse(JSON.stringify(query)));

    // 1. Executa o buildListParams para lidar com paginação e filtros conhecidos.
    let httpParams = buildListParams<TFilter>(this.mode, query, options?.aliases, options?.serialize);

    // 2. Lógica de enriquecimento para adicionar parâmetros dinâmicos que foram removidos.
    if (query?.filters) {
      // Itera sobre todas as chaves do objeto de filtros original.
      for (const key in query.filters) {
        // Verifica se a chave pertence ao objeto e se ela NÃO FOI incluída pelo buildListParams.
        if (Object.prototype.hasOwnProperty.call(query.filters, key) && !httpParams.has(key)) {
          
          const value = query.filters[key];
          
          // Se o valor for útil, adiciona-o manualmente aos parâmetros.
          if (value !== null && value !== undefined) {
            console.log(`➕ Adicionando parâmetro enriquecido/dinâmico: ${key} = ${value}`);
            // HttpParams é imutável, por isso reatribuímos a variável.
            httpParams = httpParams.append(key, value);
          }
        }
      }
    }

    // 3. Usa os parâmetros finais e completos na chamada HTTP.
    return this.http.get<AnyResponse<any[]>>(this.baseUrl, { params: httpParams }).pipe(map(unwrapList));
  }

  // Método tipado - quando precisar de type safety
  listTyped(
    query?: ListQuery<TFilter>,
    options?: { aliases?: AliasMap<TFilter>; serialize?: SerializeOptions }
  ): Observable<{ data: TItem[]; total?: number }> {
    // Este método também se beneficiará da lógica acima se for refatorado da mesma forma
    // Por enquanto, mantemos o original ou aplicamos a mesma lógica de enriquecimento.
    // Vamos aplicar para consistência:

 

    let httpParams = buildListParams<TFilter>(this.mode, query, options?.aliases, options?.serialize);

    if (query?.filters) {
      for (const key in query.filters) {
        if (Object.prototype.hasOwnProperty.call(query.filters, key) && !httpParams.has(key)) {
          const value = query.filters[key];
          if (value !== null && value !== undefined) {
            httpParams = httpParams.append(key, value);
          }
        }
      }
    }
    
    return this.http.get<AnyResponse<TItem[]>>(this.baseUrl, { params: httpParams }).pipe(map(unwrapList));
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