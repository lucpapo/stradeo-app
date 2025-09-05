import { Component } from '@angular/core';
import { basicTable } from '../../../../../shared/data/data/table/bootstrap-table/basic-tables';

@Component({
    selector: 'app-border-bottom-color',
    templateUrl: './border-bottom-color.component.html',
    styleUrls: ['./border-bottom-color.component.scss'],
    standalone: true
})
export class BorderBottomColorComponent {

  public basicTable = basicTable;

}
