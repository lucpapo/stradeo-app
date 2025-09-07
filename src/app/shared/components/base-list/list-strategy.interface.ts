/**
 * Interface para estratégias de listagem
 * Define os métodos que cada estratégia específica deve implementar
 */
export interface ListStrategy<TFilter extends object, TEntity> {
  /**
   * Valida se os filtros são suficientes para carregar dados
   */
  hasValidFilters(filters: TFilter): boolean;

  /**
   * Transforma os parâmetros antes de enviar para a API
   */
  transformQueryParams?(params: {
    page: number;
    pageSize: number;
    filters: TFilter;
  }): any;

  /**
   * Processa a resposta da API antes de atualizar o estado
   */
  processResponse?(response: any): {
    data: TEntity[];
    total: number;
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
   * Retorna as chaves do StateProvider para esta entidade
   */
  getStateKeys(): {
    shellKey: string;
    paginationKey: string;
    filterKey: string;
  };
}