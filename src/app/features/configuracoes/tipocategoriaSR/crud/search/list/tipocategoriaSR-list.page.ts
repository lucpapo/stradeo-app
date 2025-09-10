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
// Stradeo
import { TipoCategoria } from '@stradeo/domain/models/tipocategoria.model';
import { TipocategoriaFilterValue, TIPOCATEGORIA_FILTER_INITIAL_VALUE } from '@stradeo/domain/types/tipocategoria-filter.types';
import { TipoCategoriaService } from '@stradeo/services/tipocategoria.service';
import { TipocategoriaSRFilterPage } from '../filter/tipocategoriaSR-filter.page';
import { TipocategoriaSRListStrategy } from './tipocategoriaSR-list.strategy';

export interface SelectedItemState {
  selectedItem: TipoCategoria | null;
  lastAction: 'novo' | 'ver' | 'editar' | null;
}

export interface ExtendedPaginationState {
  pagination: {
    page: number;
    pageSize: number;
    total: number;
  };
  selected: SelectedItemState;
}
 
@Component({
    standalone: true,
    selector: 'app-tipocategoriaSR-list',
    imports: [CommonModule, RouterModule, NgbPaginationModule, TipocategoriaSRFilterPage, EmptyStateComponent, FullScreenLoadingComponent, PaginationFooterComponent, ErrorStateComponent],
    templateUrl: './tipocategoriaSR-list.page.html',
    styleUrls: [ ],
})
export class TipocategoriaSRListPage extends BaseListPage<TipocategoriaFilterValue, any> implements OnInit {

    private readonly service = inject(TipoCategoriaService);
    private strategy = new TipocategoriaSRListStrategy(this.service, this.router);



    constructor() {
        super();
    }

    override ngOnInit(): void {
        super.ngOnInit();
        this.setupExtendedPaginationIntegration();
    }

    /**
     * Override dos métodos de paginação para salvar na estrutura estendida
     */
    
    /**
     * Override do método de mudança de página
     */
    override onPageChange(page: number): void {
        super.onPageChange(page);
        // Após a mudança, salva na estrutura estendida
        setTimeout(() => {
            if (this.state?.pagination) {
                this.savePaginationToExtendedState(this.state.pagination);
            }
        }, 0);
    }

    /**
     * Override do método de mudança de tamanho de página
     */
    override onPageSizeChange(pageSize: number): void {
        super.onPageSizeChange(pageSize);
        // Após a mudança, salva na estrutura estendida
        setTimeout(() => {
            if (this.state?.pagination) {
                this.savePaginationToExtendedState(this.state.pagination);
            }
        }, 0);
    }

    /**
     * Override do método de aplicação de filtros
     */
    override onFilterApply(filters: TipocategoriaFilterValue): void {
        super.onFilterApply(filters);
        // Após aplicar filtros, salva na estrutura estendida
        setTimeout(() => {
            if (this.state?.pagination) {
                this.savePaginationToExtendedState(this.state.pagination);
            }
        }, 0);
    }

    /**
     * Override do método de limpeza de filtros
     */
    override onFilterClear(): void {
        super.onFilterClear();
        // Após limpar filtros, salva na estrutura estendida
        setTimeout(() => {
            if (this.state?.pagination) {
                this.savePaginationToExtendedState(this.state.pagination);
            }
        }, 0);
    }



    /**
     * Migra dados da estrutura antiga de paginação para a nova estrutura estendida
     */
    private migrateOldPaginationState(): void {
        const currentState = this.extendedPaginationStateRef.get();
        
        if (!currentState) {
            // Se não há estado, verifica se há paginação antiga no formato simples
            const oldPaginationStateRef = new StateRef<{page: number, pageSize: number, total: number}>(
                this.stateProvider,
                this.strategy.getStateKeys().shellKey,
                this.strategy.getStateKeys().paginationKey
            );
            
            const oldPagination = oldPaginationStateRef.get();
            if (oldPagination && typeof oldPagination.page === 'number') {
                console.log('🔄 Migrando paginação antiga para nova estrutura:', oldPagination);
                
                const newState: ExtendedPaginationState = {
                    pagination: oldPagination,
                    selected: {
                        selectedItem: null,
                        lastAction: null
                    }
                };
                
                this.extendedPaginationStateRef.set(newState);
            }
        } else {
            console.log('💾 Estado estendido carregado:', currentState);
        }
    }

    /**
     * Salva o item selecionado no estado estendido
     */
    private saveSelectedItemState(item: TipoCategoria | null, action: 'novo' | 'ver' | 'editar' | null): void {
        const currentState = this.extendedPaginationStateRef.get();
        
        const newSelectedState: SelectedItemState = {
            selectedItem: item,
            lastAction: action
        };

        const updatedState: ExtendedPaginationState = {
            pagination: currentState?.pagination || { page: 1, pageSize: 5, total: 0 },
            selected: newSelectedState
        };

        console.log('💾 Salvando item selecionado no estado estendido:', updatedState);
        this.extendedPaginationStateRef.set(updatedState);
    }

    /**
     * Obtém o item selecionado do estado estendido
     */
    public getSelectedItemFromState(): SelectedItemState | null {
        const state = this.extendedPaginationStateRef.get();
        return state?.selected || null;
    }

    /**
     * Obtém a paginação do estado estendido
     */
    public getPaginationFromExtendedState(): {page: number, pageSize: number, total: number} | null {
        const state = this.extendedPaginationStateRef.get();
        return state?.pagination || null;
    }

    /**
     * Salva a paginação no estado estendido
     */
    public savePaginationToExtendedState(pagination: {page: number, pageSize: number, total: number}): void {
        const currentState = this.extendedPaginationStateRef.get();
        
        const updatedState: ExtendedPaginationState = {
            pagination: pagination,
            selected: currentState?.selected || { selectedItem: null, lastAction: null }
        };

        console.log('💾 Salvando paginação no estado estendido:', updatedState);
        this.extendedPaginationStateRef.set(updatedState);
    }

    /**
     * Retorna a estratégia específica para TipoCategoria Sem Rota
     * Usa 'any' para permitir propriedades dinâmicas como status_delecao_descricao
     */
    protected getStrategy(): ListStrategy<TipocategoriaFilterValue, any> {
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
     * Este componente emite eventos para o container pai
     */
    protected getNavigationConfig() {
        return {
            useRouteNavigation: false
        };
    }

    /**
     * Override dos métodos de navegação para salvar o estado do item selecionado
     */
    
    /**
     * Navega para criar novo item - salva no estado
     */
    override irParaNovo(): void {
        this.saveSelectedItemState(null, 'novo');
        super.irParaNovo();
    }

    /**
     * Navega para visualizar um item - salva no estado
     */
    override irParaVer(item: TipoCategoria): void {
        this.saveSelectedItemState(item, 'ver');
        super.irParaVer(item);
    }

    /**
     * Navega para editar um item - salva no estado
     */
    override irParaEditar(item: TipoCategoria): void {
        this.saveSelectedItemState(item, 'editar');
        super.irParaEditar(item);
    }

    /**
     * Intercepta as operações de paginação para usar nossa estrutura estendida
     */
    private setupExtendedPaginationIntegration(): void {
        // Aguarda a inicialização completa e então configura a integração
        setTimeout(() => {
            this.interceptPaginationOperations();
        }, 100);
    }

    /**
     * Intercepta as operações de paginação para usar nossa estrutura estendida
     */
    private interceptPaginationOperations(): void {
        // Verifica se há dados de paginação no formato antigo para migrar
        const currentExtended = this.extendedPaginationStateRef.get();
        if (!currentExtended && this.paginationStateRef) {
            const oldPagination = this.paginationStateRef.get();
            if (oldPagination && typeof oldPagination.page === 'number') {
                console.log('🔄 Migrando paginação do BaseListPage para estrutura estendida:', oldPagination);
                
                const newState: ExtendedPaginationState = {
                    pagination: oldPagination,
                    selected: {
                        selectedItem: null,
                        lastAction: null
                    }
                };
                
                this.extendedPaginationStateRef.set(newState);
            }
        }

        // Sincroniza o estado atual se necessário
        this.syncPaginationState();
    }

    /**
     * Sincroniza o estado de paginação entre BaseListPage e nossa estrutura estendida
     */
    private syncPaginationState(): void {
        const extendedState = this.extendedPaginationStateRef.get();
        if (extendedState?.pagination && this.state?.pagination) {
            // Atualiza o estado interno do BaseListPage com os dados da estrutura estendida
            this.state.pagination = extendedState.pagination;
            console.log('🔄 Estado de paginação sincronizado:', extendedState.pagination);
        }
    }
}