import { Component } from '@angular/core';
import { SizingPaginationComponent } from './sizing-pagination/sizing-pagination.component';
import { AlignmentPaginationComponent } from './alignment-pagination/alignment-pagination.component';
import { RoundedPaginationComponent } from './rounded-pagination/rounded-pagination.component';
import { IconsPaginationComponent } from './icons-pagination/icons-pagination.component';
import { ActiveDisabledComponent } from './active-disabled/active-disabled.component';
import { DefaultPaginationComponent } from './default-pagination/default-pagination.component';

@Component({
    selector: 'app-pagination',
    templateUrl: './pagination.component.html',
    styleUrls: ['./pagination.component.scss'],
    standalone: true,
    imports: [DefaultPaginationComponent, ActiveDisabledComponent, IconsPaginationComponent, RoundedPaginationComponent, AlignmentPaginationComponent, SizingPaginationComponent]
})
export class PaginationComponent {

}
