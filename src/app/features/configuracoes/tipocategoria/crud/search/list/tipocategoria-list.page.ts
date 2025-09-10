import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
// PCODE
import { BaseListPage, ListStrategy } from '@pcode/ui/base-list';
import { StateRef } from '@pcode/store/state-ref';
import { EmptyStateComponent } from '@pcodeshared/components/empty-state/empty-state.component';
import { FullScreenLoadingComponent } from '@pcodeshared/components/full-screen-loading/full-screen-loading.component';
import { PaginationFooterComponent } from '@pcodeshared/components/pagination-footer/pagination-footer.component';
import { ErrorStateComponent } from '@pcodeshared/components/error-state/error-state.component';
import { StateProvider, LOCAL_STORAGE_KEY, USE_BASE64_ENCODING } from '../../../../../../corepcode/store/state-provider';
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
    styleUrls: [],
    providers: [
        StateProvider,
        { provide: LOCAL_STORAGE_KEY, useValue: 'ui-TipocategoriaShellComponent' },
        { provide: USE_BASE64_ENCODING, useValue: false }
    ]
})
export class TipocategoriaListPage extends BaseListPage<TipocategoriaFilterValue, any> implements OnInit {

    private readonly service = inject(TipoCategoriaService);
    protected override readonly stateProvider = inject(StateProvider);
    private strategy = new TipocategoriaListStrategy(this.service, this.router);

    constructor() {
        super();
    }

    override ngOnInit() {
        super.ngOnInit();
        
        // Força a criação do estado inicial de paginação
        setTimeout(() => {
            if (this.paginationStateRef && !this.paginationStateRef.get()) {
                this.paginationStateRef.set(this.state.pagination);
                console.log(`[TipocategoriaList] Estado de paginação criado: TipocategoriaListPage#main`);
            }
        }, 0);
        
        console.log(`[TipocategoriaList] Component inicializado`);
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

    /**
     * Configuração de navegação - usa rota por padrão
     * Para usar eventos, mude useRouteNavigation para false
     */
    protected getNavigationConfig() {
        return {
            useRouteNavigation: true,
            baseRoute: '/configuracoes/tipocategoria'
        };
    }

}