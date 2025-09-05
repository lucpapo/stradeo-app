import { Component } from '@angular/core';
import { OffsetComponent } from './offset/offset.component';
import { OrderComponent } from './order/order.component';
import { NestingComponent } from './nesting/nesting.component';
import { HorizontalAlignmentComponent } from './horizontal-alignment/horizontal-alignment.component';
import { VerticalAlignmentComponent } from './vertical-alignment/vertical-alignment.component';
import { GridColumnComponent } from './grid-column/grid-column.component';
import { GridOptionsComponent } from './grid-options/grid-options.component';

@Component({
    selector: 'app-grid',
    templateUrl: './grid.component.html',
    styleUrls: ['./grid.component.scss'],
    standalone: true,
    imports: [GridOptionsComponent, GridColumnComponent, VerticalAlignmentComponent, HorizontalAlignmentComponent, NestingComponent, OrderComponent, OffsetComponent]
})
export class GridComponent {

}
