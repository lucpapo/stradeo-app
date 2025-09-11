import { Component } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';

// 1. Importe a nova CLASSE BASE e os componentes filhos
 
import { TipocategoriaListSRPage } from './crud/search/list/tipocategoriaSR-list.page';
import { TipocategoriaSRDetailPage } from './crud/view/tipocategoriaSR-detail.page';
import { BaseContainerDirective } from '@pcode/ui/base-container/base-container.component';

@Component({
  selector: 'app-tipocategoriaSR-container',
  standalone: true,
  imports: [
    CommonModule,
    NgIf,  
    TipocategoriaListSRPage,
    TipocategoriaSRDetailPage
  ],
  // 2. O template agora é simples e direto, usando as propriedades da classe base
  template: `
    <app-tipocategoriaSR-list
      *ngIf="!showDetail"
      (actionEvent)="onListAction($event)">
    </app-tipocategoriaSR-list>
    <div *ngIf="showDetail">
      <app-tipocategoriaSR-detail
        [initializationMode]="'state'"
        [stateSourceKey]="'TipocategoriaListSRPage#main'"
        (navigateWithOutRoute)="onCloseDetail($event)">
      </app-tipocategoriaSR-detail>
    </div>
  `
})
 
export class TipocategoriaSRContainerComponent extends BaseContainerDirective {
 
  readonly containerStateKey = "TipocategoriaSRContainer#viewState";
  readonly listStateKey = "TipocategoriaListSRPage#main";
  readonly filterStateKey = "TipocategoriaSRFilterPage#main";

 
}

