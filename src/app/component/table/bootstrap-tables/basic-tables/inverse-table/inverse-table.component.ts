import { Component } from '@angular/core';
import { inverseTable } from '../../../../../shared/data/data/table/bootstrap-table/basic-tables';

@Component({
    selector: 'app-inverse-table',
    templateUrl: './inverse-table.component.html',
    styleUrls: ['./inverse-table.component.scss'],
    standalone: true
})
export class InverseTableComponent {

  public inversetableData = inverseTable;

}
