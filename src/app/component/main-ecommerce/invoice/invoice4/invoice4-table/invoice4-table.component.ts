import { Component } from '@angular/core';
import { invoice4 } from '../../../../../shared/data/data/main-ecommerce/invoice';

@Component({
    selector: 'app-invoice4-table',
    templateUrl: './invoice4-table.component.html',
    styleUrls: ['./invoice4-table.component.scss'],
    standalone: true
})
export class Invoice4TableComponent {

  public invoice4Data = invoice4;

}
