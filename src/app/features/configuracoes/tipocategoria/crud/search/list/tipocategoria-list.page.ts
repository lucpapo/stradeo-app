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
import { TipoCategoriaService } from '@stradeo/services/tipocategoria.service';
import { TipocategoriaFilterPage } from '../filter/tipocategoria-filter.page';
import { TipocategoriaListStrategy } from './tipocategoria-list.strategy';

@Component({
    standalone: true,
    selector: 'app-tipocategoria-list',
    imports: [CommonModule, RouterModule, NgbPaginationModule, TipocategoriaFilterPage, EmptyStateComponent, FullScreenLoadingComponent, PaginationFooterComponent, ErrorStateComponent],
    templateUrl: './tipocategoria-list.page.html',
    styleUrls: [],
})
export class TipocategoriaListPage extends BaseListPage<Record<string, any>, any> {

  private readonly service = inject(TipoCategoriaService);
 
  private strategy = new TipocategoriaListStrategy(this.service, this.router);

  constructor() {
    super();
  }

  protected getStrategy(): ListStrategy<Record<string, any>, any> {
    return this.strategy;
  }

  /**
   * Retorna os filtros iniciais usando o novo modelo de objeto JSON.
   */
  // ALTERAR este método
  protected getInitialFilters(): Record<string, any> {
    return {
      descricao: '',
      status_delecao: ''
    };
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