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
import { CategoriaTarifaService } from '@stradeo/services/categoriatarifa.service';
import { CategoriaTarifaFilterPage } from '../filter/categoriatarifa-filter.page';
import { CategoriaTarifaListStrategy } from './categoriatarifa-list.strategy';
@Component({
    standalone: true,
    selector: 'app-categoriatarifa-list',
    imports: [CommonModule, RouterModule, NgbPaginationModule, CategoriaTarifaFilterPage, EmptyStateComponent, FullScreenLoadingComponent, PaginationFooterComponent, ErrorStateComponent],
    templateUrl: './categoriatarifa-list.page.html',
    styleUrls: [],
})
export class CategoriaTarifaListPage extends BaseListPage<Record<string, any>, any> {
    private readonly service = inject(CategoriaTarifaService);
    private strategy = new CategoriaTarifaListStrategy(this.service, this.router);
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
            tarifa_id: '',
            categoria_id: '',
            valor: '',
            data_cadastro: '',
            usuario_cadastro: '',
            data_atualizacao: '',
            usuario_atualizacao: '',
            status_delecao: ''
        };
    }
    /**
     * Configuração de navegação para as ações de CRUD.
     */
    protected getNavigationConfig() {
        return {
            useRouteNavigation: true,
            baseRoute: '/configuracoes/categoriatarifa'
        };
    }
}