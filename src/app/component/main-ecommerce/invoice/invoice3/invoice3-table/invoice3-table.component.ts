import { Component } from '@angular/core';
import { invoice3 } from '../../../../../shared/data/data/main-ecommerce/invoice';

@Component({
    selector: 'app-invoice3-table',
    templateUrl: './invoice3-table.component.html',
    styleUrls: ['./invoice3-table.component.scss'],
    standalone: true
})
export class Invoice3TableComponent {


  public invoice3Data = invoice3;

}
