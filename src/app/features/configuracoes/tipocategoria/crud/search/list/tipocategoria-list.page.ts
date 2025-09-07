import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';

// Importações Específicas desta Feature
import { TipocategoriaFilterPage } from '../filter/tipocategoria-filter.page';
import { TipocategoriaFilterValue, TIPOCATEGORIA_FILTER_INITIAL_VALUE } from '@stradeo/domain/types/tipocategoria-filter.types';
import { TipoCategoriaService } from '@stradeo/services/tipocategoria.service';
import { TipoCategoria } from '@stradeo/domain/models/tipocategoria.model';

import { EmptyStateComponent } from '@pcodeshared/components/empty-state/empty-state.component';
import { FullScreenLoadingComponent } from '@pcodeshared/components/full-screen-loading/full-screen-loading.component';
import { PaginationFooterComponent } from '@pcodeshared/components/pagination-footer/pagination-footer.component';
import { ErrorStateComponent } from '@pcodeshared/components/error-state/error-state.component';
import { BaseListPage, ListStrategy } from '@pcodeshared/components/base-list';
import { TipocategoriaListStrategy } from './tipocategoria-list.strategy';

@Component({
    standalone: true,
    selector: 'app-tipocategoria-list',
    imports: [CommonModule, RouterModule, NgbPaginationModule, TipocategoriaFilterPage, EmptyStateComponent, FullScreenLoadingComponent, PaginationFooterComponent, ErrorStateComponent],
    templateUrl: './tipocategoria-list.page.html',
    styleUrls: ['./tipocategoria-list.page.scss'],
})
export class TipocategoriaListPage extends BaseListPage<TipocategoriaFilterValue, TipoCategoria> {

    private readonly service = inject(TipoCategoriaService);
    private strategy = new TipocategoriaListStrategy();

    constructor() {
        super();
    }

    /**
     * Retorna a estratégia específica para TipoCategoria
     */
    protected getStrategy(): ListStrategy<TipocategoriaFilterValue, TipoCategoria> {
        return this.strategy;
    }

    /**
     * Retorna os filtros iniciais para TipoCategoria
     */
    protected getInitialFilters(): TipocategoriaFilterValue {
        return TIPOCATEGORIA_FILTER_INITIAL_VALUE;
    }

    /**
     * Carrega os dados do serviço
     */
    protected loadDataFromService(queryParams: any): Observable<any> {
        return this.service.list(queryParams);
    }

    /**
     * Navegação
     */
    irParaNovo(): void {
        this.router.navigate(['/configuracoes/tipocategoria/novo']);
    }

    irParaVer(item: TipoCategoria): void {
        this.router.navigate(['/configuracoes/tipocategoria', item.id, 'view']);
    }

    irParaEditar(item: TipoCategoria): void {
        this.router.navigate(['/configuracoes/tipocategoria', item.id, 'edit']);
    }
}