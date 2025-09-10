// tipocategoria-container.component.ts
import { Component, ViewChild, AfterViewInit, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { TipocategoriaSRListPage } from './crud/search/list/tipocategoriaSR-list.page';
import { TipocategoriaSRDetailPage } from './crud/view/tipocategoriaSR-detail.page';
import { ListActionEvent } from '@pcode/ui/base-list/list-strategy.interface';
import { StateProvider } from '@pcode/store/state-provider';
import { StateRef } from '@pcode/store/state-ref';
import { TipoCategoria } from '@stradeo/domain/models/tipocategoria.model';

export interface TipocategoriaContainerState {
  selectedItem: TipoCategoria | null;
  detailMode: 'view' | 'edit' | 'new';
  showDetail: boolean;
}

@Component({
  selector: 'app-tipocategoria-container',
  standalone: true,
  imports: [CommonModule, RouterModule, TipocategoriaSRListPage, TipocategoriaSRDetailPage],
  template: `
    
  `
})
export class TipocategoriaContainer  {
} 
