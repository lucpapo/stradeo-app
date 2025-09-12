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
import { CategoriaService } from '@stradeo/services/categoria.service';
import { CategoriaFilterPage } from '../filter/categoria-filter.page';
import { CategoriaListStrategy } from './categoria-list.strategy';
@Component({
standalone: true,
selector: 'app-categoria-list',
imports: [CommonModule, RouterModule, NgbPaginationModule, CategoriaFilterPage, EmptyStateComponent, FullScreenLoadingComponent, PaginationFooterComponent, ErrorStateComponent],
templateUrl: './categoria-list.page.html',
styleUrls: [],
})
export class CategoriaListPage extends BaseListPage<Record<string, any>, any> {
private readonly service = inject(CategoriaService);
private strategy = new CategoriaListStrategy(this.service, this.router);
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
concessao_id: '',
descricao: '',
numero_eixos: '',
tipo_categoria_id: '',
codigo_tarifa_basica: '',
codigo_categoria_adm: '',
codigo_poder_concedente: '',
considera_trafego: '',
ordem: '',
tipo: '',
maximo_eixos_suspenso: '',
eixos_equivalentes: '',
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
        baseRoute: '/configuracoes/categoria'
    };
}
}