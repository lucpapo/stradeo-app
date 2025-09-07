/**
 * Interface padrão para filtros com estado de validação
 * Todos os filtros devem seguir este padrão
 */
export interface FilterState<T> {
  data: T;
  valid: boolean;
}

/**
 * Interface opcional para métodos de navegação
 * Strategies que implementam navegação devem implementar estes métodos
 */
export interface NavigationStrategy<TEntity> {
  irParaNovo(): void;
  irParaVer(item: TEntity): void;
  irParaEditar(item: TEntity): void;
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

  /**
   * Retorna o nome da propriedade que contém o ID da entidade
   * Implementação padrão retorna 'id'
   * Sobrescreva se a entidade usar outro nome para o ID
   */
  getColunaId(): keyof TEntity {
    return 'id' as keyof TEntity;
  }

  /**
   * Extrai o valor do ID de um item
   * Usa getColunaId() para determinar qual propriedade acessar
   */
  getIdValue(item: TEntity): string | number {
    return item[this.getColunaId()] as string | number;
  }

  // Métodos de navegação - implementação padrão
  // Strategies que implementam NavigationStrategy herdam estes métodos automaticamente
  // Requer que a strategy tenha propriedades baseRoute e router
  
  /**
   * Navega para criar novo item
   * Usa baseRoute da strategy
   */
  irParaNovo(): void {
    const strategy = this as any;
    strategy.router.navigate([strategy.baseRoute, 'novo']);
  }

  /**
   * Navega para visualizar um item
   * Usa getColunaId() e getIdValue() para acessar o ID dinamicamente
   */
  irParaVer(item: TEntity): void {
    const strategy = this as any;
    strategy.router.navigate([strategy.baseRoute, this.getIdValue(item).toString(), 'view']);
  }

  /**
   * Navega para editar um item
   * Usa getColunaId() e getIdValue() para acessar o ID dinamicamente
   */
  irParaEditar(item: TEntity): void {
    const strategy = this as any;
    strategy.router.navigate([strategy.baseRoute, this.getIdValue(item).toString(), 'edit']);
  }
}