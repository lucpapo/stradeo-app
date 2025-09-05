import { Component } from '@angular/core';
import { tableHead } from '../../../../../shared/data/data/table/bootstrap-table/basic-tables';

@Component({
    selector: 'app-table-head-options',
    templateUrl: './table-head-options.component.html',
    styleUrls: ['./table-head-options.component.scss'],
    standalone: true
})
export class tableHeadOptionsComponent {

  public headoptionsData = tableHead;

}
