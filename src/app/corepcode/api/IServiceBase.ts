import { Observable } from 'rxjs';

// Tipos auxiliares para corresponder à sua BaseService.
// Estes podem ser movidos para um ficheiro partilhado se necessário.
type ListQuery<TFilters> = {
  page?: number;
  pageSize?: number;
  filters?: TFilters;
};
type AliasMap<TFilters> = Partial<Record<keyof TFilters, any>>;
type SerializeOptions = any;
type KeyInput = number | string | Record<string, any>;

/**
 * Interface que define um contrato CRUD completo, para ser implementada
 * pela sua BaseService e consumida pela arquitetura de UI.
 * @template TRow O tipo do objeto da linha de dados (ex: TipoCategoria).
 * @template TFilter O tipo do objeto de filtro (ex: TipocategoriaFilterValue).
 * @template TKey O tipo da chave primária (ex: number).
 */
export interface IServiceBase<
  TRow, 
  TFilter extends Record<string, any>, 
  TKey extends KeyInput = number
> {
  /**
   * Obtém uma lista paginada e filtrada de itens.
   */
  list(
    query?: ListQuery<TFilter>,
    options?: { aliases?: AliasMap<TFilter>; serialize?: SerializeOptions }
  ): Observable<{ data: TRow[]; total?: number }>;

  /**
   * Obtém um único item pela sua chave.
   */
  get<R = TRow>(key: TKey): Observable<R>;

  /**
   * Cria um novo item.
   */
  create<R = TRow>(payload: Partial<TRow>): Observable<R>;

  /**
   * Atualiza um item existente pela sua chave.
   */
  update<R = TRow>(key: TKey, payload: Partial<TRow>): Observable<R>;

  /**
   * Elimina um item pela sua chave.
   */
  delete(key: TKey): Observable<void>;
}

