import { Component } from '@angular/core';
import { invoice1 } from '../../../../../shared/data/data/main-ecommerce/invoice';

@Component({
    selector: 'app-invoice1-table',
    templateUrl: './invoice1-table.component.html',
    styleUrls: ['./invoice1-table.component.scss'],
    standalone: true
})
export class Invoice1TableComponent {

  public invoiceData = invoice1;

}
