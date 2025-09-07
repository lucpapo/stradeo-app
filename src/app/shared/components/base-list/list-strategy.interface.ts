/**
 * Interface padrão para filtros com estado de validação
 * Todos os filtros devem seguir este padrão
 */
export interface FilterState<T> {
  data: T;
  valid: boolean;
}

/**
 * Classe abstrata para estratégias de listagem
 * Define os métodos que cada estratégia específica deve implementar
 * e fornece implementações padrão para métodos comuns
 */
export abstract class ListStrategy<TFilter extends object, TEntity> {
  /**
   * Valida se os filtros são suficientes para carregar dados
   * Suporta tanto FilterState (novo formato) quanto TFilter (compatibilidade)
   */
  hasValidFilters(filtersOrState: FilterState<TFilter> | TFilter): boolean {
    // Se tem propriedade 'valid', é FilterState (novo formato)
    if (typeof filtersOrState === 'object' && filtersOrState !== null && 'valid' in filtersOrState) {
      const filterState = filtersOrState as FilterState<TFilter>;
      return filterState.valid && this.validateAdditionalRules(filterState);
    }

    // Caso contrário, é o formato antigo - chama validação legacy
    return this.validateFiltersLegacy(filtersOrState as TFilter);
  }

  /**
   * Validação legacy para compatibilidade com código existente
   * Implementação padrão que sempre retorna true
   * Sobrescreva se usar o formato antigo
   */
  protected validateFiltersLegacy(_filters: TFilter): boolean {
    return true;
  }

  /**
   * Validações adicionais específicas da entidade
   * Implementação padrão que retorna o valid do state provider
   * Sobrescreva apenas se precisar de validações extras além do state provider
   */
  validateAdditionalRules(filterState: FilterState<TFilter>): boolean {
    return filterState.valid;
  }

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