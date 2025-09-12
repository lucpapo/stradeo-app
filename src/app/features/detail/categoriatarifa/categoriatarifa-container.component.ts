import { Component } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
// Importações dinâmicas para os componentes de lista e detalhe do sub-registro
import { CategoriaTarifaListPage } from './crud/search/list/categoriatarifa-list.page';
import { CategoriaTarifaDetailPage } from './crud/view/categoriatarifa-detail.page';
import { BaseContainerDirective } from '@pcode/ui/base-container/base-container.component';
@Component({
selector: 'app-categoriatarifa-container',
standalone: true,
imports: [
CommonModule,
NgIf,
CategoriaTarifaListPage,
CategoriaTarifaDetailPage
],
template: `<app-categoriatarifa-list *ngIf="!showDetail" (actionEvent)="onListAction($event)"> 
            </app-categoriatarifa-list> 
            <div *ngIf="showDetail"> 
            <app-categoriatarifa-detail [initializationMode]="'state'" 
            [stateSourceKey]="'CategoriaTarifaListPage#main'" 
            (navigateWithOutRoute)="onCloseDetail($event)"> 
           </app-categoriatarifa-detail> 
           </div>`
})
export class CategoriaTarifaContainerComponent extends BaseContainerDirective {
readonly containerStateKey = "CategoriaTarifaContainer#viewState";
readonly listStateKey = "CategoriaTarifaListPage#main";
readonly filterStateKey = "CategoriaTarifaFilterPage#main";
}