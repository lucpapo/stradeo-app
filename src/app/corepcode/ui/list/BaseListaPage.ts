import { Directive, inject, input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KeyInput } from '@pcode/api';
import { IGerenciadorLista } from './IGerenciadorLista';
import { IServiceBase } from '@pcode/api/IServiceBase';
import { GerenciadorListaSignal } from './GerenciadorListaSignal';
import { StateRef } from '@pcode/store/state-ref';
import { StateProvider } from '@pcode/store/state-provider';

// Importações da nossa arquitetura


@Directive()
export abstract class BaseListaPage<
  TRow extends { id: TKey },
  TFilter extends object,
  TKey extends KeyInput
> implements OnInit {

  protected readonly router = inject(Router);
  protected readonly stateProvider = inject(StateProvider);

  // Inputs para configuração do StateRef
  masterKey = input<string>('');
  componentKey = input<string>('');
  filtro = input<string>(''); // Chave do filtro no state (ex: TipocategoriaFilterPage#main)

  // Usamos a asserção de atribuição definitiva (!) porque garantimos que será
  // inicializado em ngOnInit antes de ser usado pelo template.
  public gerenciador!: IGerenciadorLista<TRow, TFilter, TKey>;

  // Mapa para múltiplos gerenciadores (solução avançada)
  protected gerenciadores = new Map<string, IGerenciadorLista<TRow, TFilter, TKey>>();

  // NOVO: Sistema de targets para múltiplos gerenciadores
  protected filterManagers = new Map<string, IGerenciadorLista<TRow, TFilter, TKey>>();

  private _stateRef?: StateRef<{ pagination: { page: number; qtdPage: number } }>;

  constructor() {
    // O construtor é mantido vazio.
    // Inicializar o 'gerenciador' aqui causaria o erro, porque as dependências
    // do componente filho (como o serviço) ainda não foram injetadas.
  }

  // --- Contrato para a Classe Filha ---
  protected abstract obterServico(): IServiceBase<TRow, TFilter, TKey>;
  protected abstract obterEstadoInicialQuery(): { page: number; pageSize: number; filters: TFilter };

  // NOVO: Contratos opcionais para funcionalidades avançadas
  protected abstract obterTargetsIniciais?(): string[];
  protected abstract obterRotaBase?(): string;
  protected abstract obterRotaNovo?(): string;

  /**
   * Obtém o filtro do state baseado na chave configurada no input 'filtro'
   */
  protected obterFiltroDoState(): TFilter | null {
    const filtroKey = this.filtro();
    const masterKey = this.masterKey();

    if (!filtroKey || !masterKey) {
      return null;
    }

    const filtroStateRef = new StateRef(this.stateProvider, masterKey, filtroKey);
    const filtroState = filtroStateRef.get();

    return filtroState?.value?.filters || null;
  }

  /**
   * Cria ou obtém um gerenciador específico para uma chave de filtro
   */
  protected obterGerenciadorParaFiltro(filtroKey: string): IGerenciadorLista<TRow, TFilter, TKey> {
    if (this.gerenciadores.has(filtroKey)) {
      return this.gerenciadores.get(filtroKey)!;
    }

    // Obtém filtro específico do state
    const masterKey = this.masterKey();
    let filtroDoState: TFilter | null = null;

    if (masterKey && filtroKey) {
      const filtroStateRef = new StateRef(this.stateProvider, masterKey, filtroKey);
      const filtroState = filtroStateRef.get();
      filtroDoState = filtroState?.value?.filters || null;
    }

    // Cria query inicial
    const estadoInicialQuery = this.obterEstadoInicialQuery();
    const queryFinal = filtroDoState
      ? { ...estadoInicialQuery, filters: filtroDoState }
      : estadoInicialQuery;

    // Cria novo gerenciador
    const novoGerenciador = new GerenciadorListaSignal<TRow, TFilter, TKey>(
      this.obterServico(),
      queryFinal
    );

    this.gerenciadores.set(filtroKey, novoGerenciador);
    
    // CORREÇÃO: Não carrega automaticamente se há filtro do state
    // A carga será feita apenas quando o filtro for aplicado via evento apply
    if (!filtroDoState) {
      novoGerenciador.load();
    }
    
    return novoGerenciador;
  }

  /**
   * StateRef configurado automaticamente baseado nos inputs masterKey e componentKey
   */
  protected get stateRef(): StateRef<{ pagination: { page: number; qtdPage: number } }> | null {
    const masterKey = this.masterKey();
    const componentKey = this.componentKey();

    if (!masterKey || !componentKey) {
      return null;
    }

    if (!this._stateRef) {
      this._stateRef = new StateRef(this.stateProvider, masterKey, componentKey);
    }

    return this._stateRef;
  }

  /**
   * Valor inicial para paginação - pode ser sobrescrito nas classes filhas
   */
  protected get valorInicialPaginacao(): { page: number; qtdPage: number } {
    return { page: 0, qtdPage: 10 };
  }

  /**
   * Retorna o gerenciador ativo baseado no input 'filtro'
   * Se 'filtro' estiver configurado, usa o gerenciador específico para essa chave
   * Senão, usa o gerenciador padrão
   */
  get gerenciadorAtivo(): IGerenciadorLista<TRow, TFilter, TKey> {
    const filtroKey = this.filtro();
    
    if (filtroKey) {
      return this.obterGerenciadorParaFiltro(filtroKey);
    }
    
    return this.gerenciador;
  }

  /**
   * Retorna informação sobre qual filtro está sendo usado
   */
  get infoFiltroAtivo(): string {
    const filtroKey = this.filtro();
    
    if (filtroKey) {
      return `Filtro: ${filtroKey}`;
    }
    
    return 'Filtro: Padrão (sem input filtro)';
  }

  // NOVO: Sistema de Targets - Métodos genéricos
  
  /**
   * Obtém um gerenciador para um target específico
   */
  getFilterManager(target: string): IGerenciadorLista<TRow, TFilter, TKey> {
    const manager = this.filterManagers.get(target);
    if (!manager) {
      console.warn(`Gerenciador para target '${target}' não encontrado. Verifique se foi inicializado.`);
      // Retorna o gerenciador padrão como fallback
      return this.gerenciador;
    }
    return manager;
  }

  /**
   * Aplica filtro a múltiplos targets
   */
  applyFilterToTargets(filtro: TFilter, targets: string[]): void {
    console.log(`Aplicando filtro aos targets: ${targets.join(', ')}`, filtro);

    targets.forEach(target => {
      const manager = this.getFilterManager(target);
      manager.aplicarFiltro(filtro);
    });
  }

  /**
   * Limpa filtro de múltiplos targets
   */
  clearFilterFromTargets(targets: string[]): void {
    console.log(`Limpando filtro dos targets: ${targets.join(', ')}`);

    targets.forEach(target => {
      const manager = this.getFilterManager(target);
      manager.limparFiltro();
    });
  }

  /**
   * Retorna informações sobre filtros ativos
   */
  getActiveFiltersInfo(): string[] {
    const info: string[] = [];

    this.filterManagers.forEach((manager, target) => {
      const hasFilters = Object.values(manager.filterValue() || {}).some(value =>
        value !== null && value !== undefined && value !== ''
      );

      if (hasFilters) {
        info.push(`${target} (${manager.total()} registros)`);
      }
    });

    return info.length > 0 ? info : ['Nenhum filtro ativo'];
  }

  /**
   * Inicializa gerenciadores para targets específicos
   */
  protected initializeTargetManagers(targets: string[]): void {
    targets.forEach(target => {
      if (!this.filterManagers.has(target)) {
        const estadoInicial = this.obterEstadoInicialQuery();

        const novoGerenciador = new GerenciadorListaSignal<TRow, TFilter, TKey>(
          this.obterServico(),
          estadoInicial
        );
        this.filterManagers.set(target, novoGerenciador);
        
        // CORREÇÃO: NÃO carrega automaticamente
        // A carga será feita apenas quando o filtro for aplicado via evento apply
        // novoGerenciador.load();
      }
    });
  }

  // NOVO: Navegação genérica (se configurada)
  
  /**
   * Navega para novo registro
   */
  irParaNovo(): void {
    const rotaNovo = this.obterRotaNovo?.();
    if (rotaNovo) {
      this.router.navigate([rotaNovo]);
    } else {
      console.warn('Rota para novo não configurada. Implemente obterRotaNovo() na classe filha.');
    }
  }

  /**
   * Navega para visualizar registro
   */
  irParaVer(item: TRow): void {
    const rotaBase = this.obterRotaBase?.();
    if (rotaBase) {
      this.router.navigate([rotaBase, item.id, 'view']);
    } else {
      console.warn('Rota base não configurada. Implemente obterRotaBase() na classe filha.');
    }
  }

  /**
   * Navega para editar registro
   */
  irParaEditar(item: TRow): void {
    const rotaBase = this.obterRotaBase?.();
    if (rotaBase) {
      this.router.navigate([rotaBase, item.id, 'edit']);
    } else {
      console.warn('Rota base não configurada. Implemente obterRotaBase() na classe filha.');
    }
  }

  // --- Ciclo de Vida ---
  ngOnInit(): void {
    // Inicializa StateRef se configurado
    if (this.stateRef) {
      const savedState = this.stateRef.get();
      if (!savedState) {
        // Se não existe estado salvo, salva o valor inicial
        const valorInicial = this.valorInicialPaginacao;
        this.stateRef.set({ pagination: valorInicial });
      }
    }

    // CORREÇÃO: Inicializa gerenciador apenas com estado inicial
    // NÃO carrega dados automaticamente - aguarda evento apply do filtro
    const estadoInicialQuery = this.obterEstadoInicialQuery();
    
    this.gerenciador = new GerenciadorListaSignal<TRow, TFilter, TKey>(
      this.obterServico(),
      estadoInicialQuery
    );

    // NOVO: Inicializa targets se configurados
    const targets = this.obterTargetsIniciais?.();
    if (targets && targets.length > 0) {
      this.initializeTargetManagers(targets);
    }
  }
}

