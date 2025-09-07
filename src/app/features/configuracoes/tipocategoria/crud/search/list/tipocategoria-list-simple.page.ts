import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

// Importações Específicas desta Feature
import { TipocategoriaFilterSimplePage, TipocategoriaFilterValue } from '../filter/tipocategoria-filter-simple.page';
import { TipoCategoriaService } from '@stradeo/services/tipocategoria.service';
import { TipoCategoria } from '@stradeo/domain/models/tipocategoria.model';
import { EmptyStateComponent } from '../../../../../../shared/components/empty-state/empty-state.component';
import { FullScreenLoadingComponent } from '../../../../../../shared/components/full-screen-loading/full-screen-loading.component';
import { StateRef } from '@pcode/store/state-ref';
import { StateProvider } from '@pcode/store/state-provider';

interface PaginationState {
    page: number;
    pageSize: number;
    total: number;
}

interface ListState {
    filters: TipocategoriaFilterValue;
    pagination: PaginationState;
    data: TipoCategoria[];
    loading: boolean;
    error: string | null;
}

@Component({
    standalone: true,
    selector: 'app-tipocategoria-list-simple',
    imports: [CommonModule, RouterModule, NgbPaginationModule, TipocategoriaFilterSimplePage, EmptyStateComponent, FullScreenLoadingComponent],
    templateUrl: './tipocategoria-list-simple.page.html',
    styleUrls: ['./tipocategoria-list.page.scss'],
})
export class TipocategoriaListSimplePage implements OnInit {

    private readonly service = inject(TipoCategoriaService);
    private readonly router = inject(Router);
    private readonly stateProvider = inject(StateProvider);

    @ViewChild(TipocategoriaFilterSimplePage) filterComponent!: TipocategoriaFilterSimplePage;

    // StateRef específico para paginação
    private paginationStateRef: StateRef<PaginationState>;

    // StateRef para acessar os filtros salvos
    private filterStateRef: StateRef<TipocategoriaFilterValue>;

    // Estado da lista
    state: ListState = {
        filters: { descricao: '', status_delecao: '0' },
        pagination: { page: 1, pageSize: 5, total: 0 }, // Mudei para 10 para testar
        data: [],
        loading: false,
        error: null
    };

    // Controle de pesquisa
    private isPesquisar = false;
    private isFirstLoad = true;

    constructor() {
        // StateRef específico para paginação
        this.paginationStateRef = new StateRef<PaginationState>(
            this.stateProvider,
            'ui-TipocategoriaShellComponent',
            'TipocategoriaListPage#main'
        );

        // StateRef para acessar os filtros
        this.filterStateRef = new StateRef<TipocategoriaFilterValue>(
            this.stateProvider,
            'ui-TipocategoriaShellComponent',
            'TipocategoriaFilterPage#main'
        );
    }

    ngOnInit(): void {
        this.initializeFromState();
    }

    /**
     * Inicializa o componente verificando se há dados salvos no state
     */
    private initializeFromState(): void {
        // Restaura paginação
        const savedPagination = this.paginationStateRef.get();
        if (savedPagination) {
            this.state.pagination = savedPagination;
            console.log('🔄 Paginação restaurada do estado:', {
                page: this.state.pagination.page,
                pageSize: this.state.pagination.pageSize,
                total: this.state.pagination.total
            });
        }

        // Restaura filtros
        const savedFilters = this.filterStateRef.get();
        if (savedFilters) {
            this.state.filters = savedFilters;
            console.log('🔄 Filtros restaurados do estado:', savedFilters);

            // Se há filtros válidos salvos, carrega os dados automaticamente
            if (this.hasValidFilters()) {
                console.log('✅ Carregando dados com filtros e paginação restaurados');
                this.loadData();
            }
        } else {
            console.log('⏳ Aguardando filtros serem aplicados...');
        }

        this.isFirstLoad = false;
    }

    /**
     * Verifica se há filtros válidos para carregar dados
     */
    private hasValidFilters(): boolean {
        // Descrição é obrigatória e deve ter pelo menos 1 caractere
        return this.state.filters.descricao.trim() !== '';
    }

    /**
     * Chamado quando o usuário clica em "Pesquisar" no filtro
     */
    onFilterApply(filters: TipocategoriaFilterValue): void {
        console.log('🔍 onFilterApply chamado - Usuário clicou em Pesquisar');
        this.isPesquisar = true;
        this.applyFiltersAndLoad(filters);
    }

    /**
     * Chamado quando o usuário clica em "Limpar" no filtro
     */
    onFilterClear(): void {
        console.log('🧹 onFilterClear chamado - Usuário clicou em Limpar');
        const initialFilters: TipocategoriaFilterValue = { descricao: '', status_delecao: '0' };
        this.isPesquisar = true;
        this.applyFiltersAndLoad(initialFilters);
    }

    /**
     * Aplica os filtros e carrega os dados
     */
    private applyFiltersAndLoad(filters: TipocategoriaFilterValue): void {
        if (this.isPesquisar) {
            console.log('🔍 Aplicando filtros (click manual do usuário):', {
                filtrosAtuais: this.state.filters,
                novosFiltros: filters
            });

            // Click manual do usuário sempre reseta paginação para página 1
            console.log('🔄 Click manual - Resetando paginação para página 1');
            this.state.pagination.page = 1;

            this.state.filters = filters;
            this.savePaginationAndLoad();
            this.isPesquisar = false;
        }
    }

    /**
     * Chamado quando muda a página
     */
    onPageChange(page: number): void {
        console.log('🔄 Mudança de página:', page);

        // Só permite mudança de página se há filtros válidos
        if (!this.hasValidFilters()) {
            console.log('❌ Não é possível paginar sem filtros válidos');
            return;
        }

        this.isPesquisar = false; // Não é pesquisa, é paginação
        this.state.pagination.page = page;
        this.saveStateAndLoad();
    }

    /**
     * Chamado quando muda o tamanho da página
     */
    onPageSizeChange(pageSizeValue: string): void {
        const pageSize = parseInt(pageSizeValue, 10);
        console.log('📏 Mudança de pageSize:', pageSize);

        // Só permite mudança se há filtros válidos
        if (!this.hasValidFilters()) {
            console.log('❌ Não é possível alterar pageSize sem filtros válidos');
            return;
        }

        this.isPesquisar = false;
        this.state.pagination.pageSize = pageSize;
        this.state.pagination.page = 1; // Reset para primeira página
        this.saveStateAndLoad();
    }

    /**
     * Salva o estado atual e carrega os dados
     */
    private savePaginationAndLoad(): void {
        this.savePagination();
        this.loadData();
    }

    /**
     * Salva o estado atual e carrega os dados
     */
    private saveStateAndLoad(): void {
        this.savePagination();
        this.loadData();
    }

    /**
     * Carrega os dados da API
     */
    private loadData(): void {
        // Só carrega se os filtros forem válidos
        if (!this.hasValidFilters()) {
            console.log('⚠️ Não carregando dados - Filtros inválidos');
            this.state.data = [];
            this.state.pagination.total = 0;
            return;
        }

        this.state.loading = true;
        this.state.error = null;

        const queryParams = {
            page: this.state.pagination.page,
            pageSize: this.state.pagination.pageSize,
            filters: this.state.filters
        };

        console.log('📡 Carregando dados com parâmetros:', queryParams);
        console.log('📡 PageSize sendo enviado:', queryParams.pageSize);
        console.log('📡 Estrutura completa do queryParams:', JSON.stringify(queryParams, null, 2));

        this.service.list(queryParams).subscribe({
            next: (response: { data: TipoCategoria[]; total?: number }) => {
                this.state.data = response.data;
                this.state.pagination.total = response.total || 0;
                this.state.loading = false;
                this.savePagination();
                console.log('✅ Dados carregados:', {
                    page: this.state.pagination.page,
                    pageSize: this.state.pagination.pageSize,
                    total: this.state.pagination.total,
                    dataLength: response.data.length
                });
            },
            error: (error: any) => {
                this.state.error = 'Erro ao carregar dados: ' + (error.message || 'Erro desconhecido');
                this.state.loading = false;
                this.state.data = [];
                console.error('❌ Erro ao carregar dados:', error);
            }
        });
    }

    /**
     * Salva o estado atual no StateRef
     */
    private savePagination(): void {
        console.log('💾 Salvando paginação no estado:', {
            page: this.state.pagination.page,
            pageSize: this.state.pagination.pageSize,
            total: this.state.pagination.total
        });
        this.paginationStateRef.set(this.state.pagination);
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

    /**
     * Getters para o template
     */
    get loading(): boolean {
        return this.state.loading;
    }

    get error(): string | null {
        return this.state.error;
    }

    get data(): TipoCategoria[] {
        return this.state.data;
    }

    get currentPage(): number {
        return this.state.pagination.page;
    }

    get pageSize(): number {
        return this.state.pagination.pageSize;
    }

    get total(): number {
        return this.state.pagination.total;
    }

    get filters(): TipocategoriaFilterValue {
        return this.state.filters;
    }

    /**
     * Mostra o range de itens sendo exibidos
     */
    get showingRange(): string {
        if (this.total === 0) return 'Nenhum registro encontrado';

        const start = (this.currentPage - 1) * this.pageSize + 1;
        const end = Math.min(this.currentPage * this.pageSize, this.total);
        return `Mostrando ${start} a ${end} de ${this.total} registros`;
    }
}