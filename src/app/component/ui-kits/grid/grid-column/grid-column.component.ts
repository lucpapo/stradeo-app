import { Component } from '@angular/core';
import { gridColumn } from '../../../../shared/data/data/ui-kits/grid-options';

@Component({
    selector: 'app-grid-column',
    templateUrl: './grid-column.component.html',
    styleUrls: ['./grid-column.component.scss'],
    standalone: true
})
export class GridColumnComponent {

  public gridColumnData = gridColumn;

}
