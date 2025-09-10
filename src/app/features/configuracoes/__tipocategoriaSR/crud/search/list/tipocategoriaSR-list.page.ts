import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
// PCODE
import { EmptyStateComponent } from '@pcodeshared/components/empty-state/empty-state.component';
import { FullScreenLoadingComponent } from '@pcodeshared/components/full-screen-loading/full-screen-loading.component';
import { PaginationFooterComponent } from '@pcodeshared/components/pagination-footer/pagination-footer.component';
import { ErrorStateComponent } from '@pcodeshared/components/error-state/error-state.component';
// Stradeo
import { TipocategoriaSRFilterPage } from '../filter/tipocategoriaSR-filter.page';

// As interfaces de estado não são mais necessárias aqui, pois são gerenciadas pela classe base.

@Component({
    standalone: true,
    selector: 'app-tipocategoriaSR-list',
    imports: [CommonModule, RouterModule, NgbPaginationModule, TipocategoriaSRFilterPage, EmptyStateComponent, FullScreenLoadingComponent, PaginationFooterComponent, ErrorStateComponent],
    templateUrl: './tipocategoriaSR-list.page.html',
    styleUrls: [ ],
})
export class TipocategoriaSRListPage {

    
}