import { Component } from '@angular/core';
import { stripedData } from '../../../../../shared/data/data/table/bootstrap-table/basic-tables';

@Component({
    selector: 'app-striped-row-inverse-table',
    templateUrl: './striped-row-inverse-table.component.html',
    styleUrls: ['./striped-row-inverse-table.component.scss'],
    standalone: true
})
export class StripedRowInverseTableComponent {

  public striped = stripedData;

}
