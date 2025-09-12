import { Component } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
// Importações dinâmicas para os componentes de lista e detalhe do sub-registro
import { CategoriaEspecialListPage } from './crud/search/list/categoriaespecial-list.page';
import { CategoriaEspecialDetailPage } from './crud/view/categoriaespecial-detail.page';
import { BaseContainerDirective } from '@pcode/ui/base-container/base-container.component';
import { StateRef } from '@pcode/store/state-ref';

export interface CategoriaContainerState {
    showDetail: boolean;
}


@Component({
    selector: 'app-categoriaespecial-container',
    standalone: true,
    imports: [
        CommonModule,
        NgIf,
        CategoriaEspecialListPage,
        CategoriaEspecialDetailPage
    ],
    template: `<app-categoriaespecial-list *ngIf="!showDetail" (actionEvent)="onListAction($event)"> 
            </app-categoriaespecial-list> 
            <div *ngIf="showDetail"> 
            <app-categoriaespecial-detail [initializationMode]="'state'" 
            [stateSourceKey]="'CategoriaEspecialListPage#main'" 
            (navigateWithOutRoute)="onCloseDetail($event)"> 
           </app-categoriaespecial-detail> 
           </div>`
})
export class CategoriaEspecialContainerComponent extends BaseContainerDirective {
    readonly containerStateKey = "CategoriaEspecialContainer#viewState";
    readonly listStateKey = "CategoriaEspecialListPage#main";
    readonly filterStateKey = "CategoriaEspecialFilterPage#main";


    protected override initializeState(): void {
        this.containerStateRef = new StateRef<CategoriaContainerState>(
            this.stateProvider,
            'ui-CategoriaShellComponent',
            'CategoriaEspecialContainer#viewState'
        );
    }
}