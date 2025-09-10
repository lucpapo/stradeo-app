import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
 import { TipocategoriaSRDetailPage } from './crud/view/tipocategoriaSR-detail.page';
import { ListActionEvent } from '@pcode/ui/base-list/list-strategy.interface';
import { StateProvider } from '@pcode/store/state-provider';
import { StateRef } from '@pcode/store/state-ref';
import { TipocategoriaListSRPage } from './crud/search/list/tipocategoriaSR-list.page';

// Interface para o estado de visibilidade do container
export interface TipocategoriaContainerState {
  showDetail: boolean;
}

@Component({
  selector: 'app-tipocategoriaSR-container',
  standalone: true,
  imports: [CommonModule, TipocategoriaListSRPage, TipocategoriaSRDetailPage],
  template: `
    <app-tipocategoriaSR-list
      *ngIf="!showDetail"
      (actionEvent)="onListAction($event)">
    </app-tipocategoriaSR-list>

    <div *ngIf="showDetail">
     
    <app-tipocategoriaSR-detail
            [initializationMode]="'state'"
            [stateSourceKey]="'TipocategoriaSRListPage#main'"
            (navigateWithOutRoute)="onCloseDetail($event)">
        </app-tipocategoriaSR-detail>

      
    </div>
  `
})
export class TipocategoriaSRContainerComponent implements OnInit {

  private readonly stateProvider = inject(StateProvider);
  private containerStateRef!: StateRef<TipocategoriaContainerState>;
  public showDetail = false;

  ngOnInit() {
    this.initializeState();
    this.loadState();
  }

  private initializeState(): void {
    this.containerStateRef = new StateRef<TipocategoriaContainerState>(
      this.stateProvider,
      'ui-TipocategoriaShellComponent',
      'TipocategoriaSRContainer#viewState'
    );
  }

  private loadState(): void {
    const savedState = this.containerStateRef.get();
    if (savedState) {
      this.showDetail = savedState.showDetail;
      console.log('💾 Estado do container SR carregado:', savedState);
    }
  }

  private saveState(): void {
    const currentState: TipocategoriaContainerState = {
      showDetail: this.showDetail
    };
    this.containerStateRef.set(currentState);
    console.log('💾 Estado do container SR salvo:', currentState);
  }

  onListAction(event: ListActionEvent<any>): void {
    console.log(`[Container SR] Ação da lista: ${event.action}`);
    this.showDetail = true;
    this.saveState();
  }

  onCloseDetail(reason: string): void {
    console.log('[Container SR] Voltando para a lista.', reason);
    this.showDetail = false;
    this.saveState();
  }
}