// tipocategoria-container.component.ts
import { Component, ViewChild, AfterViewInit, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { TipocategoriaSRListPage } from './crud/search/list/tipocategoriaSR-list.page';
import { TipocategoriaSRDetailPage } from './crud/view/tipocategoriaSR-detail.page';
import { ListActionEvent } from '@pcode/ui/base-list/list-strategy.interface';
import { StateProvider } from '@pcode/store/state-provider';
import { StateRef } from '@pcode/store/state-ref';
import { TipoCategoria } from '@stradeo/domain/models/tipocategoria.model';

export interface TipocategoriaContainerState {
  selectedItem: TipoCategoria | null;
  detailMode: 'view' | 'edit' | 'new';
  showDetail: boolean;
}

@Component({
  selector: 'app-tipocategoria-container',
  standalone: true,
  imports: [CommonModule, RouterModule, TipocategoriaSRListPage, TipocategoriaSRDetailPage],
  template: `
    <app-tipocategoriaSR-list 
      *ngIf="!showDetail" 
      (actionEvent)="onListAction($event)">
    </app-tipocategoriaSR-list>
    
    <div *ngIf="showDetail" class="position-relative">
      <!-- Botão de voltar no topo -->
      <div class="d-flex justify-content-start mb-2">
        <button type="button" class="btn btn-outline-secondary btn-sm" (click)="onCloseDetail()">
          <i class="fa fa-arrow-left me-1"></i>
          Voltar para Lista
        </button>
      </div>
      
      <app-tipocategoriaSR-detail #detailComponent>
      </app-tipocategoriaSR-detail>
    </div>
  `
})
export class TipocategoriaContainer implements OnInit, AfterViewInit {
  @ViewChild('detailComponent') detailComponent?: TipocategoriaSRDetailPage;
  @ViewChild(TipocategoriaSRListPage) listComponent?: TipocategoriaSRListPage;

  // Dependências
  private readonly stateProvider = inject(StateProvider);

  // State management
  private containerStateRef!: StateRef<TipocategoriaContainerState>;

  // Estado local
  showDetail = false;
  selectedItem: TipoCategoria | null = null;
  detailMode: 'view' | 'edit' | 'new' = 'view';

  ngOnInit() {
    this.initializeState();
    this.loadStateFromStorage();
  }

  ngAfterViewInit() {
    // Configuração adicional se necessário
  }

  /**
   * Inicializa o gerenciamento de estado
   */
  private initializeState() {
    this.containerStateRef = new StateRef<TipocategoriaContainerState>(
      this.stateProvider,
      'ui-TipocategoriaShellComponent', // Usa a mesma chave da lista
      'container'
    );
  }

  /**
   * Carrega o estado salvo do storage
   */
  private loadStateFromStorage() {
    // Primeiro verifica se há estado do container
    const savedState = this.containerStateRef.get();
    if (savedState) {
      this.selectedItem = savedState.selectedItem;
      this.detailMode = savedState.detailMode;
      this.showDetail = savedState.showDetail;

      console.log('💾 Estado do container carregado:', savedState);

      // Se havia um item selecionado, reconfigura o componente
      if (this.showDetail && this.selectedItem) {
        setTimeout(() => {
          this.configureDetailComponent();
        });
      }
    }

    // Também verifica o estado do item selecionado na lista
    setTimeout(() => {
      if (this.listComponent) {
        const listSelectedState = this.listComponent.getSelectedItemFromState();
        if (listSelectedState && listSelectedState.selectedItem) {
          console.log('💾 Item selecionado encontrado na lista:', listSelectedState);

          // Se não há estado do container mas há item selecionado na lista, usa ele
          if (!savedState && listSelectedState.lastAction) {
            this.selectedItem = listSelectedState.selectedItem;
            this.detailMode = listSelectedState.lastAction === 'novo' ? 'new' :
              listSelectedState.lastAction === 'ver' ? 'view' : 'edit';
            this.showDetail = true;
            this.saveStateToStorage();

            setTimeout(() => {
              this.configureDetailComponent();
            });
          }
        }
      }
    }, 100);
  }

  /**
   * Salva o estado atual no storage
   */
  private saveStateToStorage() {
    const currentState: TipocategoriaContainerState = {
      selectedItem: this.selectedItem,
      detailMode: this.detailMode,
      showDetail: this.showDetail
    };

    console.log('💾 Salvando estado no storage:', currentState);
    this.containerStateRef.set(currentState);
  }

  /**
   * Manipula as ações da lista (novo, ver, editar)
   * O item já foi salvo no estado da lista, aqui apenas configuramos a visualização
   */
  onListAction(event: ListActionEvent<any>) {
    console.log('Ação da lista:', event);
    console.log('💾 Item já foi salvo no estado da lista pelo componente TipocategoriaSRListPage');

    switch (event.action) {
      case 'novo':
        this.abrirModalNovo();
        break;

      case 'ver':
        this.abrirModalVer(event.item);
        break;

      case 'editar':
        this.abrirModalEditar(event.item);
        break;
    }
  }

  /**
   * Abre componente para criar novo item
   */
  private abrirModalNovo() {
    console.log('Abrir componente para novo item');
    this.selectedItem = null;
    this.detailMode = 'new';
    this.showDetail = true;

    // Salva o estado
    this.saveStateToStorage();

    // Configura o componente após a view ser inicializada
    setTimeout(() => {
      this.configureDetailComponent();
    });
  }

  /**
   * Abre componente para visualizar item
   */
  private abrirModalVer(item: TipoCategoria) {
    console.log('Abrir componente para ver item:', item);
    this.selectedItem = item;
    this.detailMode = 'view';
    this.showDetail = true;

    // Salva o estado com o item selecionado
    this.saveStateToStorage();

    // Configura o componente após a view ser inicializada
    setTimeout(() => {
      this.configureDetailComponent();
    });
  }

  /**
   * Abre componente para editar item
   */
  private abrirModalEditar(item: TipoCategoria) {
    console.log('Abrir componente para editar item:', item);
    this.selectedItem = item;
    this.detailMode = 'edit';
    this.showDetail = true;

    // Salva o estado com o item selecionado
    this.saveStateToStorage();

    // Configura o componente após a view ser inicializada
    setTimeout(() => {
      this.configureDetailComponent();
    });
  }

  /**
   * Configura o componente de detalhes com os dados e modo apropriados
   */
  private configureDetailComponent() {
    if (!this.detailComponent) return;

    try {
      // Configura o componente baseado no modo usando a API correta do BaseDetailPage
      if (this.detailMode === 'new') {
        // Para novo item, define modo de criação
        this.detailComponent.mode.set('create');
        this.detailComponent.id.set(null);
        this.detailComponent.entity.set(null);
      } else if (this.selectedItem) {
        // Para visualizar/editar, define o modo e ID apropriados
        this.detailComponent.mode.set(this.detailMode === 'view' ? 'view' : 'edit');
        this.detailComponent.id.set(this.selectedItem.id);

        // Carrega a entidade se necessário
        // O componente irá carregar automaticamente baseado no ID
        // Mas podemos definir a entidade diretamente se já temos os dados
        if (this.selectedItem) {
          this.detailComponent.entity.set(this.selectedItem);
        }
      }
    } catch (error) {
      console.warn('Erro ao configurar componente de detalhes:', error);
    }
  }

  /**
   * Fecha o componente de detalhes e volta para a lista
   */
  onCloseDetail() {
    console.log('Fechando componente de detalhes');
    this.showDetail = false;
    this.selectedItem = null;
    this.detailMode = 'view';

    // Salva o estado limpo
    this.saveStateToStorage();
  }

  /**
   * Método público para ser chamado pelo componente de detalhes
   * quando precisar voltar para a lista
   */
  public goBackToList() {
    this.onCloseDetail();
  }
}
