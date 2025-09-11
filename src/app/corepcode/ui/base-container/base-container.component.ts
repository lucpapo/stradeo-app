import { Directive, inject, OnInit } from '@angular/core';
import { LOCAL_STORAGE_KEY, StateProvider } from '@pcode/store/state-provider';
import { StateRef } from '@pcode/store/state-ref';
import { ListActionEvent } from '@pcode/ui/base-list/list-strategy.interface';

// Interface para o estado, continua a mesma
export interface ContainerViewState {
  showDetail: boolean;
}

/**
 * Diretiva de base abstrata para containers de Lista/Detalhe (Abordagem de Herança).
 *
 * Contém toda a lógica de gerenciamento de estado e visibilidade.
 * Componentes filhos devem estender esta classe e implementar as chaves de estado.
 *
 * Usamos @Directive para permitir injeção de dependência e hooks de ciclo de vida
 * sem a necessidade de um template próprio.
 */
@Directive()
export abstract class BaseContainerDirective implements OnInit {
  // --- Propriedades Abstratas (devem ser implementadas pelo filho) ---
  abstract readonly containerStateKey: string;
  abstract readonly listStateKey: string;
  abstract readonly filterStateKey?: string;

  // --- Injeção de Dependências ---
  protected readonly stateProvider = inject(StateProvider);
  protected readonly shellKey = inject(LOCAL_STORAGE_KEY);

  // --- Propriedades Públicas (acessíveis pelo template do filho) ---
  public showDetail = false;

  // --- Propriedades Privadas ---
  private containerStateRef!: StateRef<ContainerViewState>;

  ngOnInit() {
    this.limparEstadoDosFilhos();
    this.initializeState();
    this.loadState();
  }

  private initializeState(): void {
    this.containerStateRef = new StateRef<ContainerViewState>(
      this.stateProvider,
      'ui-shell-component',
      this.containerStateKey
    );
  }

  private loadState(): void {
    const savedState = this.containerStateRef.get();
    if (savedState) {
      this.showDetail = savedState.showDetail;
      console.log(`[BaseContainer] 💾 Estado carregado para '${this.containerStateKey}':`, savedState);
    }
  }

  private saveState(): void {
    const currentState: ContainerViewState = { showDetail: this.showDetail };
    this.containerStateRef.set(currentState);
    console.log(`[BaseContainer] 💾 Estado salvo para '${this.containerStateKey}':`, currentState);
  }

  // --- Métodos Públicos (acessíveis pelo template do filho) ---
  public onListAction(event: ListActionEvent<any>): void {
    console.log(`[BaseContainer] Ação recebida da lista: ${event.action}. Exibindo detalhes.`);
    this.showDetail = true;
    this.saveState();
  }

  public onCloseDetail(reason: string): void {
    console.log(`[BaseContainer] Fechando detalhes: ${reason}. Voltando para a lista.`);
    this.showDetail = false;
    this.saveState();
  }

  private limparEstadoDosFilhos(): void {
    console.log(`[BaseContainer] Limpando estado para os filhos...`);
    const listState = new StateRef(this.stateProvider, this.shellKey, this.listStateKey);
    listState.remove();

    if (this.filterStateKey) {
      const filterState = new StateRef(this.stateProvider, this.shellKey, this.filterStateKey);
      filterState.remove();
    }
  }
}
