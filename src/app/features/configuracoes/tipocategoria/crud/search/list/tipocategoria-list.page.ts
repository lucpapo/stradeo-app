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
// Stradeo
import { TipocategoriaFilterValue, TIPOCATEGORIA_FILTER_INITIAL_VALUE } from '@stradeo/domain/types/tipocategoria-filter.types';
import { TipoCategoriaService } from '@stradeo/services/tipocategoria.service';
import { TipocategoriaFilterPage } from '../filter/tipocategoria-filter.page';
import { TipocategoriaListStrategy } from './tipocategoria-list.strategy';

@Component({
    standalone: true,
    selector: 'app-tipocategoria-list',
    imports: [CommonModule, RouterModule, NgbPaginationModule, TipocategoriaFilterPage, EmptyStateComponent, FullScreenLoadingComponent, PaginationFooterComponent, ErrorStateComponent],
    templateUrl: './tipocategoria-list.page.html',
    styleUrls: ['./tipocategoria-list.page.scss'],
})
export class TipocategoriaListPage extends BaseListPage<TipocategoriaFilterValue, any> {

    private readonly service = inject(TipoCategoriaService);
    private strategy = new TipocategoriaListStrategy(this.service, this.router);

    constructor() {
        super();
    }

    /**
     * Retorna a estratégia específica para TipoCategoria
     * Usa 'any' para permitir propriedades dinâmicas como status_delecao_descricao
     */
    protected getStrategy(): ListStrategy<TipocategoriaFilterValue, any> {
        return this.strategy;
    }

    /**
     * Retorna os filtros iniciais para TipoCategoria
     */
    protected getInitialFilters(): TipocategoriaFilterValue {
        return TIPOCATEGORIA_FILTER_INITIAL_VALUE;
    }

}