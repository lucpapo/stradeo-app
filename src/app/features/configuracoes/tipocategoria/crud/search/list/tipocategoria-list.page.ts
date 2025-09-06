import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

 
// Importações Específicas desta Feature
import { TipocategoriaFilterPage, TipocategoriaFilterValue } from '../filter/tipocategoria-filter.page';
import {  TipoCategoriaService } from '@stradeo/services/tipocategoria.service';
import { BaseListaPage } from '@pcode/ui/list/BaseListaPage';
import { IServiceBase } from '@pcode/api/IServiceBase';
import { TipoCategoria } from '@stradeo/domain/models/tipocategoria.model';
 
@Component({
  standalone: true,
  selector: 'app-tipocategoria-list',
  imports: [CommonModule, RouterModule, TipocategoriaFilterPage],
  templateUrl: './tipocategoria-list.page.html',
  styleUrls: ['./tipocategoria-list.page.scss'],
})
export class TipocategoriaListPage extends BaseListaPage<
  TipoCategoria,            // TRow: O tipo do item da lista
  TipocategoriaFilterValue, // TFilter: O tipo do filtro
  number                    // TKey: O tipo da chave primária (id)
> {

  private readonly service = inject(TipoCategoriaService);
  protected override readonly router = inject(Router);

  constructor() {
    super();
  }
 
  protected obterServico(): IServiceBase<TipoCategoria, TipocategoriaFilterValue, number> {
    return this.service;
  }

 
  protected obterEstadoInicialQuery(): { page: number; pageSize: number; filters: TipocategoriaFilterValue } {
    return {
      page: 1,
      pageSize: 5,
      filters: { 
        descricao: '', 
        status_delecao: '0'  
      }
    };
  }
 
  irParaNovo(): void {
    this.router.navigate(['/configuracoes/tipocategoria', 'novo']);
  }

  irParaVer(item: TipoCategoria & { id: number }): void {
    this.router.navigate(['/configuracoes/tipocategoria', item.id, 'view']);
  }

  irParaEditar(item: TipoCategoria & { id: number }): void {
    this.router.navigate(['/configuracoes/tipocategoria', item.id, 'edit']);
  }
}

