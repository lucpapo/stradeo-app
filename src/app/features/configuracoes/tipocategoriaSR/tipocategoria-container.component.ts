// tipocategoria-container.component.ts
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TipocategoriaSRListPage } from './crud/search/list/tipocategoriaSR-list.page';
import { TipocategoriaSRDetailPage } from './crud/view/tipocategoriaSR-detail.page';
import { ListActionEvent } from '@pcode/ui/base-list/list-strategy.interface';
 
@Component({
  selector: 'app-tipocategoria-container',
  standalone: true,
  imports: [RouterModule, TipocategoriaSRListPage, TipocategoriaSRDetailPage],
  template: `
    <app-tipocategoriaSR-list (actionEvent)="onListAction($event)">
    </app-tipocategoriaSR-list>
  `
})
export class TipocategoriaContainer {

  /**
   * Manipula as ações da lista (novo, ver, editar)
   */
  onListAction(event: ListActionEvent<any>) {
    console.log('Ação da lista:', event);

    switch (event.action) {
      case 'novo':
        this.abrirModalNovo();
        break;

      case 'ver':
        this.abrirModalVer(event.item);
        break;

      case 'editar':
        this.abrirModalEditar(event.item);
        break;
    }
  }

  /**
   * Abre modal/componente para criar novo item
   */
  private abrirModalNovo() {
    console.log('Abrir modal para novo item');
    // TODO: Implementar lógica para criar novo item
  }

  /**
   * Abre modal/componente para visualizar item
   */
  private abrirModalVer(item: any) {
    console.log('Abrir modal para ver item:', item);
    // TODO: Implementar lógica para visualizar item
  }

  /**
   * Abre modal/componente para editar item
   */
  private abrirModalEditar(item: any) {
    console.log('Abrir modal para editar item:', item);
    // TODO: Implementar lógica para editar item
  }
}
