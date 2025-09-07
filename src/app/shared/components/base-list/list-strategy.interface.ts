/**
 * Classe abstrata para estratégias de listagem
 * Define os métodos que cada estratégia específica deve implementar
 * e fornece implementações padrão para métodos comuns
 */
export abstract class ListStrategy<TFilter extends object, TEntity> {
  /**
   * Valida se os filtros são suficientes para carregar dados
   */
  abstract hasValidFilters(filters: TFilter): boolean;

  /**
   * Retorna as chaves do StateProvider para esta entidade
   */
  abstract getStateKeys(): {
    shellKey: string;
    paginationKey: string;
    filterKey: string;
  };

  /**
   * Retorna as configurações de paginação padrão
   * Pode ser sobrescrito nas estratégias específicas se necessário
   */
  getDefaultPagination(): {
    page: number;
    pageSize: number;
    total: number;
  } {
    return {
      page: 1,
      pageSize: 5,
      total: 0
    };
  }

  /**
   * Transforma os parâmetros antes de enviar para a API
   * Implementação padrão que mantém os parâmetros inalterados
   * Pode ser sobrescrito nas estratégias específicas se necessário
   */
  transformQueryParams(params: {
    page: number;
    pageSize: number;
    filters: TFilter;
  }): {
    page: number;
    pageSize: number;
    filters: TFilter;
  } {
    return params;
  }

  /**
   * Processa a resposta da API antes de atualizar o estado
   * Implementação padrão que extrai data e total da resposta
   * Pode ser sobrescrito nas estratégias específicas se necessário
   */
  processResponse(response: any): {
    data: TEntity[];
    total: number;
  } {
    return {
      data: response.data || [],
      total: response.total || 0
    };
  }
}