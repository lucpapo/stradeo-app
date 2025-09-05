import { Component } from '@angular/core';
import { invoice2 } from '../../../../../shared/data/data/main-ecommerce/invoice';

@Component({
    selector: 'app-invoice2-table',
    templateUrl: './invoice2-table.component.html',
    styleUrls: ['./invoice2-table.component.scss'],
    standalone: true
})
export class Invoice2TableComponent {

  public invoice2Data = invoice2;

}
