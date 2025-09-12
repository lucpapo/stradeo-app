import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
// PCODE
import { BaseListPage, ListStrategy } from '@pcode/ui/base-list';
import { EmptyStateComponent } from '@pcodeshared/components/empty-state/empty-state.component';
import { FullScreenLoadingComponent } from '@pcodeshared/components/full-screen-loading/full-screen-loading.component';
import { PaginationFooterComponent } from '@pcodeshared/components/pagination-footer/pagination-footer.component';
import { ErrorStateComponent } from '@pcodeshared/components/error-state/error-state.component';
// Dinâmico
import { CategoriaEspecialService } from '@stradeo/services/categoriaespecial.service';
import { CategoriaEspecialFilterPage } from '../filter/categoriaespecial-filter.page';
import { CategoriaEspecialListStrategy } from './categoriaespecial-list.strategy';
@Component({
    standalone: true,
    selector: 'app-categoriaespecial-list',
    imports: [CommonModule, RouterModule, NgbPaginationModule, CategoriaEspecialFilterPage, EmptyStateComponent, FullScreenLoadingComponent, PaginationFooterComponent, ErrorStateComponent],
    templateUrl: './categoriaespecial-list.page.html',
    styleUrls: [],
})
export class CategoriaEspecialListPage extends BaseListPage<Record<string, any>, any> {
    private readonly service = inject(CategoriaEspecialService);
    private strategy = new CategoriaEspecialListStrategy(this.service, this.router);
    constructor() {
        super();
    }
    protected getStrategy(): ListStrategy<Record<string, any>, any> {
        return this.strategy;
    }
    /**
    Retorna os filtros iniciais com base nas colunas marcadas como filtráveis no JSON.
    */
    protected getInitialFilters(): Record<string, any> {
        return {
            id: '',
            categoria_id: '',
            quantidade_eixos: '',
            categoria_adm: ''
        };
    }
    /**
     * Configuração de navegação para as ações de CRUD.
     */
    protected getNavigationConfig() {
        return {
            useRouteNavigation: false,
            baseRoute: '/configuracoes/categoriaespecial'
        };
    }
}