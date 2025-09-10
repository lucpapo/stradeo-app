import { Directive, inject, OnInit, Output, EventEmitter } from '@angular/core';
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
  protected filterStateRef!: StateRef<FilterState<TFilter>>;
  protected extendedPaginationStateRef!: StateRef<{
    pagination: { page: number; pageSize: number; total: number };
    selected: { selectedItem: any; lastAction: 'novo' | 'ver' | 'editar' | null };
  }>;

  // Estado da lista
  state!: ListState<TFilter, TEntity>;

  // Controle de pesquisa
  private isPesquisar = false;

  constructor() { }

  // ngOnInit(): void {
  //   this.configureStrategy();
  //   this.initializeStateRefs();
  //   this.initializeExtendedPaginationState();
  //   this.initializeState();
  //   this.initializeFromState();
  // }
  ngOnInit(): void {
    this.configureStrategy();
    this.initializeStateRefs();
    this.initializeExtendedPaginationState();
    this.initializeState();
    this.initializeFromState();

    // ADICIONAR ESTE BLOCO DE CÓDIGO
    // Limpa qualquer seleção anterior ao entrar na página de lista
    const currentState = this.extendedPaginationStateRef.get();
    if (currentState && (currentState.selected.selectedItem !== null || currentState.selected.lastAction !== null)) {
      console.log('🧹 Limpando estado de seleção anterior ao entrar na lista.', currentState.selected);
      currentState.selected = {
        selectedItem: null,
        lastAction: null
      };
      this.extendedPaginationStateRef.set(currentState);
    }
  }

  /**
   * Inicializa o state estendido de paginação com a nova estrutura
   */
  private initializeExtendedPaginationState(): void {
    const strategy = this.getStrategy();
    const stateKeys = strategy.getStateKeys();

    this.extendedPaginationStateRef = new StateRef<{
      pagination: { page: number; pageSize: number; total: number };
      selected: { selectedItem: any; lastAction: 'novo' | 'ver' | 'editar' | null };
    }>(
      this.stateProvider,
      stateKeys.shellKey,
      stateKeys.paginationKey
    );

    // Verifica se já existe state salvo
    const savedState = this.extendedPaginationStateRef.get();
    if (!savedState) {
      // Cria o state inicial com a nova estrutura
      const initialState = {
        pagination: {
          page: 1,
          pageSize: 5,
          total: 0
        },
        selected: {
          selectedItem: null,
          lastAction: null
        }
      };
      this.extendedPaginationStateRef.set(initialState);
    }
  }

  /**
   * Inicializa os StateRefs específicos para esta entidade
   */
  private initializeStateRefs(): void {
    const strategy = this.getStrategy();
    const stateKeys = strategy.getStateKeys();

    // A referência antiga 'paginationStateRef' foi removida para evitar conflitos.

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
    // Restaura paginação a partir do estado estendido
    const savedState = this.extendedPaginationStateRef.get();
    if (savedState?.pagination) {
      this.state.pagination = savedState.pagination;
      console.log('🔄 Paginação restaurada do estado estendido:', {
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
  // private loadFromCurrentState(): void {
  //   // Recarrega o estado dos filtros do StateProvider
  //   const currentFilterState = this.filterStateRef.get();
  //   if (currentFilterState) {
  //     this.state.filters = currentFilterState;
  //     console.log('🔍 Carregando com estado atual dos filtros:', currentFilterState);

  //     if (this.hasValidFilters()) {
  //       // Reseta paginação e carrega dados
  //       this.state.pagination.page = 1;
  //       this.savePaginationAndLoad();
  //     }
  //   }
  // }
  // Substituir o método existente em: src\app\corepcode\ui\base-list\base-list.component.ts

  /**
   * Carrega dados usando o estado atual dos filtros
   */
  private loadFromCurrentState(): void {
    // Recarrega o estado dos filtros do StateProvider
    const currentFilterState = this.filterStateRef.get();

    if (currentFilterState) {
      this.state.filters = currentFilterState;
      console.log('🔍 Carregando com estado atual dos filtros:', currentFilterState);

      // 1. Reseta o estado de paginação e seleção antes de qualquer coisa
      this.resetExtendedState();

      // 2. Se os filtros forem válidos, carrega os dados.
      //    Não é mais necessário chamar savePaginationAndLoad, pois o estado já foi salvo.
      if (this.hasValidFilters()) {
        this.loadData();
      } else {
        // Se os filtros não são válidos, garante que a tabela fique vazia
        this.state.data = [];
      }
    }
  }

  /**
   * Chamado quando muda a página
   */
  onPageChange(page: number): void {
    console.log('🔄 Mudança de página:', page);

    if (!this.hasValidFilters()) {
      console.log('❌ Não é possível paginar sem filtros válidos');
      return;
    }

    this.isPesquisar = false;
    this.state.pagination.page = page;
    this.saveStateAndLoad();
  }

  /**
   * Chamado quando muda o tamanho da página
   */
  onPageSizeChange(pageSize: number): void {
    console.log('📏 Mudança de pageSize:', pageSize);

    if (!this.hasValidFilters()) {
      console.log('❌ Não é possível alterar pageSize sem filtros válidos');
      return;
    }

    this.isPesquisar = false;
    this.state.pagination.pageSize = pageSize;
    this.state.pagination.page = 1;
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

    if (strategy.transformQueryParams) {
      queryParams = strategy.transformQueryParams(queryParams);
    }

    console.log('📡 Carregando dados com parâmetros:', queryParams);

    this.loadDataFromService(queryParams).subscribe({
      next: (response: any) => {
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
   * Salva o estado atual da paginação no StateRef estendido
   */
  private savePagination(): void {
    const currentState = this.extendedPaginationStateRef.get();

    if (!currentState) {
      console.error('❌ Não foi possível salvar a paginação: estado estendido não encontrado.');
      return;
    }

    currentState.pagination = {
      page: this.state.pagination.page,
      pageSize: this.state.pagination.pageSize,
      total: this.state.pagination.total
    };

    console.log('💾 Salvando estado estendido completo:', currentState);
    this.extendedPaginationStateRef.set(currentState);
  }

  /**
   * Método para tentar carregar os dados novamente (usado pelo componente de erro)
   */
  retryLoadData = (): void => {
    console.log('🔄 Tentando carregar dados novamente...');
    this.loadData();
  }

  // Métodos abstratos
  protected abstract getStrategy(): ListStrategy<TFilter, TEntity>;
  protected abstract getInitialFilters(): TFilter;
  protected abstract getNavigationConfig(): {
    useRouteNavigation: boolean;
    baseRoute?: string;
  };

  /**
   * Carrega os dados do serviço usando a strategy
   */
  protected loadDataFromService(queryParams: any): Observable<any> {
    return this.getStrategy().loadDataFromService(queryParams);
  }

  /**
   * Configura a strategy com as opções de navegação
   */
  private configureStrategy(): void {
    const strategy = this.getStrategy() as any;
    const config = this.getNavigationConfig();

    strategy.useRouteNavigation = config.useRouteNavigation;

    if (config.useRouteNavigation) {
      strategy.router = this.router;
      strategy.baseRoute = config.baseRoute;

      if (!config.baseRoute) {
        console.warn('⚠️ baseRoute é obrigatório quando useRouteNavigation = true');
      }
    } else {
      strategy.actionEmitter = this.actionEvent;
    }
  }

  /**
   * Cria o estado inicial dos filtros com validação
   */
  protected getInitialFilterState(): FilterState<TFilter> {
    const initialFilters = this.getInitialFilters();
    const strategy = this.getStrategy();

    const initialFilterState: FilterState<TFilter> = {
      data: initialFilters,
      valid: true
    };

    const isValid = strategy.validateAdditionalRules
      ? strategy.validateAdditionalRules(initialFilterState)
      : true;

    return {
      data: initialFilters,
      valid: isValid
    };
  }

  // Getters para o template
  get loading(): boolean { return this.state.loading; }
  get error(): string | null { return this.state.error; }
  get data(): TEntity[] { return this.state.data; }
  get currentPage(): number { return this.state.pagination.page; }
  get pageSize(): number { return this.state.pagination.pageSize; }
  get total(): number { return this.state.pagination.total; }
  get filters(): TFilter { return this.state.filters.data; }
  get filterState(): FilterState<TFilter> { return this.state.filters; }

  get showingRange(): string {
    if (this.total === 0) return 'Nenhum registro encontrado';
    const start = (this.currentPage - 1) * this.pageSize + 1;
    const end = Math.min(this.currentPage * this.pageSize, this.total);
    return `Mostrando ${start} a ${end} de ${this.total} registros`;
  }

  /**
   * Métodos de navegação genéricos que delegam para a strategy
   */

  irParaNovo(): void {
    this.saveActionState('novo', null); // <-- ADICIONAR ESTA LINHA
    this.getStrategy().irParaNovo();
  }

  irParaVer(item: TEntity): void {
    this.saveActionState('ver', item); // <-- ADICIONAR ESTA LINHA
    this.getStrategy().irParaVer(item);
  }

  irParaEditar(item: TEntity): void {
    this.saveActionState('editar', item); // <-- ADICIONAR ESTA LINHA
    this.getStrategy().irParaEditar(item);
  }

  protected saveActionState(action: 'novo' | 'ver' | 'editar', item: TEntity | null): void {
    const currentState = this.extendedPaginationStateRef.get();

    if (!currentState) {
      console.error('❌ Não foi possível salvar a ação: estado estendido não inicializado.');
      return;
    }

    currentState.selected = {
      selectedItem: item,
      lastAction: action
    };

    console.log(`💾 Salvando ação '${action}' no estado:`, currentState);
    this.extendedPaginationStateRef.set(currentState);
  }

  // Adicionar este método em: src\app\corepcode\ui\base-list\base-list.component.ts

  /**
   * Reseta a paginação e o item selecionado no estado estendido.
   * Chamado ao iniciar uma nova pesquisa ou limpar os filtros.
   */
  private resetExtendedState(): void {
    const currentState = this.extendedPaginationStateRef.get();
    if (!currentState) {
      console.error('❌ Não foi possível resetar o estado: objeto de estado não encontrado.');
      return;
    }

    // Mantém o pageSize atual, mas reseta o resto
    currentState.pagination = {
      page: 1,
      pageSize: this.state.pagination.pageSize,
      total: 0
    };

    // Limpa a seleção anterior
    currentState.selected = {
      selectedItem: null,
      lastAction: null
    };

    console.log('🧹 Resetando estado estendido (paginação e seleção):', currentState);

    // Salva o estado limpo
    this.extendedPaginationStateRef.set(currentState);

    // Sincroniza o estado local do componente
    this.state.pagination = currentState.pagination;
  }
}