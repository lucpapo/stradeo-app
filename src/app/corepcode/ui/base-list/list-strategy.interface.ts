import { Observable } from 'rxjs';

/**
 * Interface padrão para filtros com estado de validação
 * Todos os filtros devem seguir este padrão
 */
export interface FilterState<T> {
  data: T;
  valid: boolean;
}

/**
 * Interface para estratégias de listagem específicas
 * Define os métodos que cada estratégia deve implementar
 */
export interface ListStrategy<TFilter extends object, TEntity> {
  /**
   * Valida se os filtros são suficientes para carregar dados
   * Suporta tanto FilterState (novo formato) quanto TFilter (compatibilidade)
   */
  hasValidFilters(filtersOrState: FilterState<TFilter> | TFilter): boolean;

  /**
   * Retorna as chaves do StateProvider para esta entidade
   */
  getStateKeys(): {
    shellKey: string;
    paginationKey: string;
    filterKey: string;
  };

  /**
   * Retorna as configurações de paginação padrão
   */
  getDefaultPagination(): {
    page: number;
    pageSize: number;
    total: number;
  };

  /**
   * Transforma os parâmetros antes de enviar para a API
   */
  transformQueryParams(params: {
    page: number;
    pageSize: number;
    filters: TFilter;
  }): {
    page: number;
    pageSize: number;
    filters: TFilter;
  };

  /**
   * Processa a resposta da API antes de atualizar o estado
   */
  processResponse(response: any): {
    data: TEntity[];
    total: number;
  };

  /**
   * Retorna o nome da propriedade que contém o ID da entidade
   */
  getColunaId(): keyof TEntity;

  /**
   * Extrai o valor do ID de um item
   */
  getIdValue(item: TEntity): string | number;

  /**
   * Navega para criar novo item
   */
  irParaNovo(): void;

  /**
   * Navega para visualizar um item
   */
  irParaVer(item: TEntity): void;

  /**
   * Navega para editar um item
   */
  irParaEditar(item: TEntity): void;

  /**
   * Carrega os dados do serviço
   */
  loadDataFromService(queryParams: any): Observable<any>;

  /**
   * Validações adicionais específicas da entidade (opcional)
   */
  validateAdditionalRules?(filterState: FilterState<TFilter>): boolean;
}