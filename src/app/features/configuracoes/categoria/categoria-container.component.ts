import { Component } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
// Importações dinâmicas para os componentes de lista e detalhe do sub-registro
import { CategoriaListPage } from './crud/search/list/categoria-list.page';
import { CategoriaDetailPage } from './crud/view/categoria-detail.page';
import { BaseContainerDirective } from '@pcode/ui/base-container/base-container.component';
@Component({
selector: 'app-categoria-container',
standalone: true,
imports: [
CommonModule,
NgIf,
CategoriaListPage,
CategoriaDetailPage
],
template: `<app-categoria-list *ngIf="!showDetail" (actionEvent)="onListAction($event)"> 
            </app-categoria-list> 
            <div *ngIf="showDetail"> 
            <app-categoria-detail [initializationMode]="'state'" 
            [stateSourceKey]="'CategoriaListPage#main'" 
            (navigateWithOutRoute)="onCloseDetail($event)"> 
           </app-categoria-detail> 
           </div>`
})
export class CategoriaContainerComponent extends BaseContainerDirective {
readonly containerStateKey = "CategoriaContainer#viewState";
readonly listStateKey = "CategoriaListPage#main";
readonly filterStateKey = "CategoriaFilterPage#main";
}