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
import { TipoCategoria } from '@stradeo/domain/models/tipocategoria.model';
import { TipocategoriaFilterValue, TIPOCATEGORIA_FILTER_INITIAL_VALUE } from '@stradeo/domain/types/tipocategoria-filter.types';
import { TipoCategoriaService } from '@stradeo/services/tipocategoria.service';
import { TipocategoriaSRFilterPage } from '../filter/tipocategoriaSR-filter.page';
import { TipocategoriaSRListStrategy } from './tipocategoriaSR-list.strategy';

// As interfaces de estado não são mais necessárias aqui, pois são gerenciadas pela classe base.

@Component({
    standalone: true,
    selector: 'app-tipocategoriaSR-list',
    imports: [CommonModule, RouterModule, NgbPaginationModule, TipocategoriaSRFilterPage, EmptyStateComponent, FullScreenLoadingComponent, PaginationFooterComponent, ErrorStateComponent],
    templateUrl: './tipocategoriaSR-list.page.html',
    styleUrls: [ ],
})
export class TipocategoriaSRListPage extends BaseListPage<TipocategoriaFilterValue, TipoCategoria> {

    private readonly service = inject(TipoCategoriaService);
    private strategy = new TipocategoriaSRListStrategy(this.service, this.router);

    constructor() {
        super();
    }

    // ngOnInit e todos os overrides de paginação (onPageChange, onFilterApply, etc.) foram removidos.
    // A classe base agora gerencia isso corretamente.

    /**
     * Salva o item selecionado e a ação no estado estendido.
     * A classe base cuidará de preservar a parte da paginação.
     */
    private saveSelectedItemState(item: TipoCategoria | null, action: 'novo' | 'ver' | 'editar' | null): void {
        // 1. Pega o estado atual completo (que já inclui a paginação correta)
        const currentState = this.extendedPaginationStateRef.get();

        if (!currentState) {
            console.error('❌ Não foi possível salvar o item selecionado: estado estendido não inicializado.');
            return;
        }

        // 2. Atualiza apenas a propriedade 'selected'
        currentState.selected = {
            selectedItem: item,
            lastAction: action
        };

        console.log('💾 Salvando item selecionado no estado estendido:', currentState);

        // 3. Salva o objeto completo de volta
        this.extendedPaginationStateRef.set(currentState);
    }

    /**
     * Obtém o item selecionado do estado estendido (pode ser útil para o componente pai)
     */
    public getSelectedItemFromState(): { selectedItem: TipoCategoria | null; lastAction: 'novo' | 'ver' | 'editar' | null } | null {
        const state = this.extendedPaginationStateRef.get();
        return state?.selected || null;
    }

    /**
     * Retorna a estratégia específica para TipoCategoria Sem Rota
     */
    protected getStrategy(): ListStrategy<TipocategoriaFilterValue, TipoCategoria> {
        return this.strategy;
    }

    /**
     * Retorna os filtros iniciais para TipoCategoria Sem Rota
     */
    protected getInitialFilters(): TipocategoriaFilterValue {
        return TIPOCATEGORIA_FILTER_INITIAL_VALUE;
    }

    /**
     * Configuração de navegação - usa eventos em vez de rota
     */
    protected getNavigationConfig() {
        return {
            useRouteNavigation: false
        };
    }

    /**
     * Override dos métodos de navegação para salvar o estado do item selecionado
     */
    
    override irParaNovo(): void {
        this.saveSelectedItemState(null, 'novo');
        super.irParaNovo(); // Chama a implementação base que emitirá o evento
    }

    override irParaVer(item: TipoCategoria): void {
        this.saveSelectedItemState(item, 'ver');
        super.irParaVer(item);
    }

    override irParaEditar(item: TipoCategoria): void {
        this.saveSelectedItemState(item, 'editar');
        super.irParaEditar(item);
    }
}