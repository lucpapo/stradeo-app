// src\app\corepcode\ui\base-list\base-list.component.ts

import { Directive, inject, OnInit, Output, EventEmitter, OnDestroy, Input } from '@angular/core';
import { Router } from '@angular/router';
import { StateRef } from '@pcode/store/state-ref';
import { LOCAL_STORAGE_KEY, StateProvider } from '@pcode/store/state-provider';
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
export abstract class BaseListPage<TFilter extends object, TEntity> implements OnInit, OnDestroy {

  protected readonly router = inject(Router);
  protected readonly stateProvider = inject(StateProvider);
  protected readonly shellKey = inject(LOCAL_STORAGE_KEY); // Injeção da chave para o StateProvider

  @Input() destroyStateOnClose = false;

  // ALTERAÇÃO: Adicionado novo Input para controlar o carregamento inicial.
  /**
   * Se 'true' (padrão), a lista tentará carregar os dados na inicialização
   * se houver um estado de filtro válido salvo.
   * Se 'false', a lista aguardará uma ação explícita do usuário (ex: clicar em "Pesquisar").
   */
  @Input() loadDataOnStart = true;

  @Output() actionEvent = new EventEmitter<ListActionEvent<TEntity>>();

  // StateRefs
  protected filterStateRef!: StateRef<FilterState<TFilter>>;
  protected extendedPaginationStateRef!: StateRef<{
    pagination: { page: number; pageSize: number; total: number };
    selected: { selectedItem: any; lastAction: 'novo' | 'ver' | 'editar' | null };
  }>;

  // Estado da lista
  state!: ListState<TFilter, TEntity>;

  private isPesquisar = false;

  constructor() { }

  // ngOnInit(): void {
  //   this.configureStrategy();
  //   this.initializeStateRefs();
  //   this.initializeExtendedPaginationState();
  //   this.initializeState();
  //   this.initializeFromState();

  //   const currentState = this.extendedPaginationStateRef.get();
  //   if (currentState && (currentState.selected.selectedItem !== null || currentState.selected.lastAction !== null)) {
  //     console.log('🧹 Limpando estado de seleção anterior ao entrar na lista.', currentState.selected);
  //     currentState.selected = {
  //       selectedItem: null,
  //       lastAction: null
  //     };
  //     this.extendedPaginationStateRef.set(currentState);
  //   }
  // }
  ngOnInit(): void {
    this.configureStrategy();
    this.initializeStateRefs();
    this.initializeExtendedPaginationState();
    this.initializeState();
    // ALTERAÇÃO: A chamada para initializeFromState foi MOVIDA daqui...

    // A lógica de limpeza de seleção continua aqui, pois não depende dos filhos.
    const currentState = this.extendedPaginationStateRef.get();
    if (currentState && (currentState.selected.selectedItem !== null || currentState.selected.lastAction !== null)) {
      console.log('🧹 Limpando estado de seleção anterior ao entrar na lista.', currentState.selected);
      currentState.selected = { selectedItem: null, lastAction: null };
      this.extendedPaginationStateRef.set(currentState);
    }
  }

   ngAfterViewInit(): void {
    // Usamos um setTimeout para evitar o erro ExpressionChangedAfterItHasBeenChecked
    // que pode ocorrer se a chamada de dados alterar o estado de 'loading' de forma síncrona
    // dentro deste hook do ciclo de vida.
    setTimeout(() => {
        this.initializeFromState();
    }, 0);
  }

  ngOnDestroy(): void {
    if (this.destroyStateOnClose) {
      if (this.filterStateRef) this.filterStateRef.remove();
      if (this.extendedPaginationStateRef) this.extendedPaginationStateRef.remove();
    }
  }

  /**
   * Pega um objeto de filtro e o enriquece com o estado global da concessionária.
   */
  private enrichFiltersWithGlobalState(filters: TFilter): TFilter {
    try {
      const stateWrapper = this.stateProvider.getChild<{ value: { id: number; nome: string; cnpj: string } }>(
        'ui-MasterAppComponent',
        'ConcessionariaSelector#main'
      );
      console.log(`✨ [>>>>BaseListPage] Enriquecendo filtro com objeto Concessionária:`, stateWrapper);

      const concessionariaData: any = stateWrapper;

      if (concessionariaData) {
        const enrichedPayload = {
          ...filters,
          idConcessionaria: concessionariaData.id,
          cnpjConcessionaria: concessionariaData.cnpj
        };

        console.log(`✨ [BaseListPage] Filtro final ENRIQUECIDO e ACHATADO:`, enrichedPayload);

        return enrichedPayload as TFilter;
      } else {
        console.warn('[BaseListPage] Estado da concessionária é nulo, o filtro não será enriquecido.');
      }
    } catch (error) {
      console.warn('[BaseListPage] Não foi possível enriquecer o filtro com o estado da concessionária.', error);
    }

    return filters;
  }

  /**
   * Chamado quando o usuário clica em "Pesquisar" no filtro.
   * Orquestra o enriquecimento do filtro antes de carregar os dados.
   */
  onFilterApply(filters: TFilter): void {
    console.log('[BaseListPage] 1. Recebeu filtros simples do formulário:', filters);
    this.isPesquisar = true;

    const enrichedFilters = this.enrichFiltersWithGlobalState(filters);
    this.state.filters.data = enrichedFilters;
    this.resetExtendedState();

    if (this.hasValidFilters()) {
      this.loadData();
    } else {
      this.state.data = [];
      this.state.pagination.total = 0; // Garante que a paginação seja zerada
    }
  }

  /**
   * Chamado quando o usuário clica em "Limpar" no filtro.
   */
  onFilterClear(): void {
    console.log('🧹 onFilterClear chamado - Usuário clicou em Limpar');
    this.isPesquisar = true;
    this.loadFromCurrentState();
  }

  private initializeExtendedPaginationState(): void {
    const strategy = this.getStrategy();
    const stateKeys = strategy.getStateKeys();

    this.extendedPaginationStateRef = new StateRef(
      this.stateProvider,
      this.shellKey,
      stateKeys.paginationKey
    );

    const savedState = this.extendedPaginationStateRef.get();
    if (!savedState) {
      const initialState = {
        pagination: { page: 1, pageSize: 5, total: 0 },
        selected: { selectedItem: null, lastAction: null }
      };
      this.extendedPaginationStateRef.set(initialState);
    }
  }

  private initializeStateRefs(): void {
    const strategy = this.getStrategy();
    const stateKeys = strategy.getStateKeys();

    this.filterStateRef = new StateRef<FilterState<TFilter>>(
      this.stateProvider,
      this.shellKey,
      stateKeys.filterKey
    );
  }

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

  // ALTERAÇÃO: Lógica de inicialização completamente reescrita para ser mais robusta.
  /**
   * Inicializa o estado da lista a partir do StateProvider.
   * Esta é a lógica central para carregar dados na inicialização.
   */
  private initializeFromState(): void {
    // 1. Carrega a paginação salva, se houver.
    const savedPaginationState = this.extendedPaginationStateRef.get();
    if (savedPaginationState?.pagination) {
      this.state.pagination = savedPaginationState.pagination;
    }

    // 2. Tenta carregar o estado do filtro salvo.
    const savedFilterState = this.filterStateRef.get();

    // 3. Só procede se um estado de filtro JÁ EXISTIR.
    // Se `savedFilterState` for nulo, significa que é a primeira vez que o usuário
    // entra nesta tela. O componente BaseFilterPage será responsável por criar
    // e salvar o estado inicial. A lista aguardará a ação do usuário.
    if (savedFilterState) {
      console.log('🔄 Estado de filtro encontrado. Restaurando:', savedFilterState);

      // 4. Enriquece os filtros restaurados com o estado global (ex: concessionária).
      const enrichedFiltersData = this.enrichFiltersWithGlobalState(savedFilterState.data);

      // 5. Atualiza o estado interno da lista com os filtros completos.
      this.state.filters = {
        data: enrichedFiltersData,
        valid: savedFilterState.valid // Mantém o status de validade original.
      };
      console.log('✨ Filtros restaurados e JÁ ENRIQUECIDOS:', this.state.filters);

      // 6. CONDIÇÃO FINAL: Carrega os dados somente se:
      //    a) Os filtros forem considerados válidos pela strategy.
      //    b) A flag `loadDataOnStart` permitir o carregamento inicial.
      if (this.hasValidFilters() && this.loadDataOnStart) {
        console.log('🚀 Filtros válidos e `loadDataOnStart` é true. Carregando dados iniciais.');
        this.loadData();
      } else {
        console.log('⏳ Dados não serão carregados na inicialização.', {
          hasValidFilters: this.hasValidFilters(),
          loadDataOnStart: this.loadDataOnStart
        });
      }
    } else {
      console.log('🆕 Nenhum estado de filtro encontrado. Aguardando BaseFilterPage inicializar o estado.');
    }
  }

  private hasValidFilters(): boolean {
    const strategy = this.getStrategy();
    return strategy.hasValidFilters(this.state.filters);
  }

  private loadFromCurrentState(): void {
    const currentFilterState = this.filterStateRef.get();
    if (currentFilterState) {
      // ALTERAÇÃO: Garante o enriquecimento também ao limpar.
      const enrichedFiltersData = this.enrichFiltersWithGlobalState(currentFilterState.data);
      this.state.filters = {
        data: enrichedFiltersData,
        valid: currentFilterState.valid
      };

      this.resetExtendedState();
      if (this.hasValidFilters()) {
        this.loadData();
      } else {
        this.state.data = [];
        this.state.pagination.total = 0;
      }
    }
  }

  onPageChange(page: number): void {
    if (!this.hasValidFilters()) return;
    this.isPesquisar = false;
    this.state.pagination.page = page;
    this.saveStateAndLoad();
  }

  onPageSizeChange(pageSize: number): void {
    if (!this.hasValidFilters()) return;
    this.isPesquisar = false;
    this.state.pagination.pageSize = pageSize;
    this.state.pagination.page = 1;
    this.saveStateAndLoad();
  }

  private saveStateAndLoad(): void {
    this.savePagination();
    this.loadData();
  }

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
      },
      error: (error: any) => {
        this.state.error = 'Erro ao carregar dados: ' + (error.message || 'Erro desconhecido');
        this.state.loading = false;
        this.state.data = [];
      }
    });
  }

  private savePagination(): void {
    const currentState = this.extendedPaginationStateRef.get();
    if (!currentState) return;
    currentState.pagination = {
      page: this.state.pagination.page,
      pageSize: this.state.pagination.pageSize,
      total: this.state.pagination.total
    };
    this.extendedPaginationStateRef.set(currentState);
  }

  retryLoadData = (): void => {
    this.loadData();
  }

  protected abstract getStrategy(): ListStrategy<TFilter, TEntity>;
  protected abstract getInitialFilters(): TFilter;
  protected abstract getNavigationConfig(): {
    useRouteNavigation: boolean;
    baseRoute?: string;
  };

  protected loadDataFromService(queryParams: any): Observable<any> {
    return this.getStrategy().loadDataFromService(queryParams);
  }

  private configureStrategy(): void {
    const strategy = this.getStrategy() as any;
    const config = this.getNavigationConfig();
    strategy.useRouteNavigation = config.useRouteNavigation;
    if (config.useRouteNavigation) {
      strategy.router = this.router;
      strategy.baseRoute = config.baseRoute;
    } else {
      strategy.actionEmitter = this.actionEvent;
    }
  }

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

  // Getters
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

  // Navegação
  irParaNovo(): void {
    this.saveActionState('novo', null);
    this.getStrategy().irParaNovo();
  }

  irParaVer(item: TEntity): void {
    this.saveActionState('ver', item);
    this.getStrategy().irParaVer(item);
  }

  irParaEditar(item: TEntity): void {
    this.saveActionState('editar', item);
    this.getStrategy().irParaEditar(item);
  }

  protected saveActionState(action: 'novo' | 'ver' | 'editar', item: TEntity | null): void {
    const currentState = this.extendedPaginationStateRef.get();
    if (!currentState) return;
    currentState.selected = {
      selectedItem: item,
      lastAction: action
    };
    this.extendedPaginationStateRef.set(currentState);
  }

  private resetExtendedState(): void {
    const currentState = this.extendedPaginationStateRef.get();
    if (!currentState) return;
    currentState.pagination = {
      page: 1,
      pageSize: this.state.pagination.pageSize,
      total: 0
    };
    currentState.selected = {
      selectedItem: null,
      lastAction: null
    };
    this.extendedPaginationStateRef.set(currentState);
    this.state.pagination = currentState.pagination;
  }
}