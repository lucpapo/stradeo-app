import { Directive, inject, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { StateRef } from '@pcode/store/state-ref';
import { StateProvider } from '@pcode/store/state-provider';
import { Observable } from 'rxjs';
import { ListStrategy, FilterState, ListActionEvent } from './list-strategy.interface';

export interface PaginationState {
  page: number;
  pageSize: number;
  total: number;
}

export interface ListState<TFilter extends object, TEntity> {
  filters: FilterState<TFilter>;
  pagination: PaginationState;
  data: TEntity[];
  loading: boolean;
  error: string | null;
}

/**
 * Classe base abstrata para componentes de listagem
 * Contém toda a lógica comum de paginação, filtros e carregamento de dados
 */
@Directive()
export abstract class BaseListPage<TFilter extends object, TEntity> implements OnInit {

  protected readonly router = inject(Router);
  protected readonly stateProvider = inject(StateProvider);

  /**
   * Evento emitido quando useRouteNavigation = false
   * Contém a ação (novo/ver/editar) e o item (quando aplicável)
   */
  @Output() actionEvent = new EventEmitter<ListActionEvent<TEntity>>();

  // StateRefs
  protected paginationStateRef!: StateRef<PaginationState>;
  protected filterStateRef!: StateRef<FilterState<TFilter>>;

  // Estado da lista
  state!: ListState<TFilter, TEntity>;

  // Controle de pesquisa
  private isPesquisar = false;

  constructor() {}

  ngOnInit(): void {
    this.configureStrategy();
    this.initializeStateRefs();
    this.initializeState();
    this.initializeFromState();
  }

  /**
   * Inicializa os StateRefs específicos para esta entidade
   */
  private initializeStateRefs(): void {
    const strategy = this.getStrategy();
    const stateKeys = strategy.getStateKeys();

    this.paginationStateRef = new StateRef<PaginationState>(
      this.stateProvider,
      stateKeys.shellKey,
      stateKeys.paginationKey
    );

    this.filterStateRef = new StateRef<FilterState<TFilter>>(
      this.stateProvider,
      stateKeys.shellKey,
      stateKeys.filterKey
    );
  }

  /**
   * Inicializa o estado da lista
   */
  private initializeState(): void {
    const strategy = this.getStrategy();
    
    this.state = {
      filters: this.getInitialFilterState(),
      pagination: strategy.getDefaultPagination(),
      data: [],
      loading: false,
      error: null
    };
  }

  /**
   * Inicializa o componente verificando se há dados salvos no state
   */
  private initializeFromState(): void {
    // Restaura paginação
    const savedPagination = this.paginationStateRef.get();
    if (savedPagination) {
      this.state.pagination = savedPagination;
      console.log('🔄 Paginação restaurada do estado:', {
        page: this.state.pagination.page,
        pageSize: this.state.pagination.pageSize,
        total: this.state.pagination.total
      });
    }

    // Restaura filtros
    const savedFilters = this.filterStateRef.get();
    if (savedFilters) {
      this.state.filters = savedFilters;
      console.log('🔄 Filtros restaurados do estado:', savedFilters);

      // Se há filtros válidos salvos, carrega os dados automaticamente
      if (this.hasValidFilters()) {
        console.log('✅ Carregando dados com filtros e paginação restaurados');
        this.loadData();
      }
    } else {
      console.log('⏳ Aguardando filtros serem aplicados...');
    }
  }

  /**
   * Verifica se há filtros válidos para carregar dados
   */
  private hasValidFilters(): boolean {
    const strategy = this.getStrategy();
    return strategy.hasValidFilters(this.state.filters);
  }

  /**
   * Chamado quando o usuário clica em "Pesquisar" no filtro
   */
  onFilterApply(filters: TFilter): void {
    console.log('🔍 onFilterApply chamado - Usuário clicou em Pesquisar');
    this.isPesquisar = true;
    
    // O filtro já foi salvo no state provider pelo BaseFilterPage
    // Apenas carregamos os dados usando o estado atual
    this.loadFromCurrentState();
  }

  /**
   * Chamado quando o usuário clica em "Limpar" no filtro
   */
  onFilterClear(): void {
    console.log('🧹 onFilterClear chamado - Usuário clicou em Limpar');
    this.isPesquisar = true;
    
    // O filtro já foi limpo no state provider pelo BaseFilterPage
    // Apenas carregamos os dados usando o estado atual
    this.loadFromCurrentState();
  }

  /**
   * Carrega dados usando o estado atual dos filtros
   */
  private loadFromCurrentState(): void {
    // Recarrega o estado dos filtros do StateProvider
    const currentFilterState = this.filterStateRef.get();
    if (currentFilterState) {
      this.state.filters = currentFilterState;
      console.log('🔍 Carregando com estado atual dos filtros:', currentFilterState);
      
      if (this.hasValidFilters()) {
        // Reseta paginação e carrega dados
        this.state.pagination.page = 1;
        this.savePaginationAndLoad();
      }
    }
  }



  /**
   * Chamado quando muda a página
   */
  onPageChange(page: number): void {
    console.log('🔄 Mudança de página:', page);

    // Só permite mudança de página se há filtros válidos
    if (!this.hasValidFilters()) {
      console.log('❌ Não é possível paginar sem filtros válidos');
      return;
    }

    this.isPesquisar = false; // Não é pesquisa, é paginação
    this.state.pagination.page = page;
    this.saveStateAndLoad();
  }

  /**
   * Chamado quando muda o tamanho da página
   */
  onPageSizeChange(pageSize: number): void {
    console.log('📏 Mudança de pageSize:', pageSize);

    // Só permite mudança se há filtros válidos
    if (!this.hasValidFilters()) {
      console.log('❌ Não é possível alterar pageSize sem filtros válidos');
      return;
    }

    this.isPesquisar = false;
    this.state.pagination.pageSize = pageSize;
    this.state.pagination.page = 1; // Reset para primeira página
    this.saveStateAndLoad();
  }

  /**
   * Salva o estado atual e carrega os dados
   */
  private savePaginationAndLoad(): void {
    this.savePagination();
    this.loadData();
  }

  /**
   * Salva o estado atual e carrega os dados
   */
  private saveStateAndLoad(): void {
    this.savePagination();
    this.loadData();
  }

  /**
   * Carrega os dados da API
   */
  private loadData(): void {
    // Só carrega se os filtros forem válidos
    if (!this.hasValidFilters()) {
      console.log('⚠️ Não carregando dados - Filtros inválidos');
      this.state.data = [];
      this.state.pagination.total = 0;
      return;
    }

    this.state.loading = true;
    this.state.error = null;

    const strategy = this.getStrategy();
    let queryParams = {
      page: this.state.pagination.page,
      pageSize: this.state.pagination.pageSize,
      filters: this.state.filters.data
    };

    // Aplica transformação se definida na estratégia
    if (strategy.transformQueryParams) {
      queryParams = strategy.transformQueryParams(queryParams);
    }

    console.log('📡 Carregando dados com parâmetros:', queryParams);

    this.loadDataFromService(queryParams).subscribe({
      next: (response: any) => {
        // Processa a resposta usando a estratégia
        const processedResponse = strategy.processResponse 
          ? strategy.processResponse(response)
          : { data: response.data, total: response.total || 0 };

        this.state.data = processedResponse.data;
        this.state.pagination.total = processedResponse.total;
        this.state.loading = false;
        this.savePagination();
        
        console.log('✅ Dados carregados:', {
          page: this.state.pagination.page,
          pageSize: this.state.pagination.pageSize,
          total: this.state.pagination.total,
          dataLength: processedResponse.data.length
        });
      },
      error: (error: any) => {
        this.state.error = 'Erro ao carregar dados: ' + (error.message || 'Erro desconhecido');
        this.state.loading = false;
        this.state.data = [];
        console.error('❌ Erro ao carregar dados:', error);
      }
    });
  }

  /**
   * Salva o estado atual no StateRef
   */
  private savePagination(): void {
    console.log('💾 Salvando paginação no estado:', {
      page: this.state.pagination.page,
      pageSize: this.state.pagination.pageSize,
      total: this.state.pagination.total
    });
    this.paginationStateRef.set(this.state.pagination);
  }

  /**
   * Método para tentar carregar os dados novamente (usado pelo componente de erro)
   */
  retryLoadData = (): void => {
    console.log('🔄 Tentando carregar dados novamente...');
    this.loadData();
  }

  // Métodos abstratos que devem ser implementados pelas classes filhas
  protected abstract getStrategy(): ListStrategy<TFilter, TEntity>;
  protected abstract getInitialFilters(): TFilter;

  /**
   * Configuração de navegação - deve ser implementado pelas classes filhas
   * Retorna se usa navegação por rota e qual a rota base
   */
  protected abstract getNavigationConfig(): {
    useRouteNavigation: boolean;
    baseRoute?: string;
  };

  /**
   * Carrega os dados do serviço usando a strategy
   * Implementação genérica que delega para strategy.loadDataFromService()
   */
  protected loadDataFromService(queryParams: any): Observable<any> {
    return this.getStrategy().loadDataFromService(queryParams);
  }

  /**
   * Configura a strategy com as opções de navegação
   */
  private configureStrategy(): void {
    const strategy = this.getStrategy() as any;
    
    // Obtém configurações do componente filho
    const config = this.getNavigationConfig();
    
    // Configura o modo de navegação
    strategy.useRouteNavigation = config.useRouteNavigation;
    
    if (config.useRouteNavigation) {
      // Modo navegação por rota
      strategy.router = this.router;
      strategy.baseRoute = config.baseRoute;
      
      if (!config.baseRoute) {
        console.warn('⚠️ baseRoute é obrigatório quando useRouteNavigation = true');
      }
    } else {
      // Modo emissão de eventos
      strategy.actionEmitter = this.actionEvent;
    }
  }

  /**
   * Cria o estado inicial dos filtros com validação
   */
  protected getInitialFilterState(): FilterState<TFilter> {
    const initialFilters = this.getInitialFilters();
    const strategy = this.getStrategy();
    
    // Cria o FilterState inicial
    const initialFilterState: FilterState<TFilter> = {
      data: initialFilters,
      valid: true // Assumimos válido inicialmente
    };
    
    // Usa validateAdditionalRules para verificar se os filtros iniciais são válidos (se disponível)
    const isValid = strategy.validateAdditionalRules 
      ? strategy.validateAdditionalRules(initialFilterState)
      : true;
    
    return {
      data: initialFilters,
      valid: isValid
    };
  }

  // Getters para o template
  get loading(): boolean {
    return this.state.loading;
  }

  get error(): string | null {
    return this.state.error;
  }

  get data(): TEntity[] {
    return this.state.data;
  }

  get currentPage(): number {
    return this.state.pagination.page;
  }

  get pageSize(): number {
    return this.state.pagination.pageSize;
  }

  get total(): number {
    return this.state.pagination.total;
  }

  get filters(): TFilter {
    return this.state.filters.data;
  }

  get filterState(): FilterState<TFilter> {
    return this.state.filters;
  }

  /**
   * Mostra o range de itens sendo exibidos
   */
  get showingRange(): string {
    if (this.total === 0) return 'Nenhum registro encontrado';

    const start = (this.currentPage - 1) * this.pageSize + 1;
    const end = Math.min(this.currentPage * this.pageSize, this.total);
    return `Mostrando ${start} a ${end} de ${this.total} registros`;
  }

  /**
   * Métodos de navegação genéricos que delegam para a strategy
   */
  
  /**
   * Navega para criar novo item
   */
  irParaNovo(): void {
    const strategy = this.getStrategy();
    strategy.irParaNovo();
  }

  /**
   * Navega para visualizar um item
   */
  irParaVer(item: TEntity): void {
    const strategy = this.getStrategy();
    strategy.irParaVer(item);
  }

  /**
   * Navega para editar um item
   */
  irParaEditar(item: TEntity): void {
    const strategy = this.getStrategy();
    strategy.irParaEditar(item);
  }
}