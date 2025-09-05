import { Component } from '@angular/core';
import { invoice6 } from '../../../../../shared/data/data/main-ecommerce/invoice';


@Component({
    selector: 'app-invoice6-table',
    templateUrl: './invoice6-table.component.html',
    styleUrls: ['./invoice6-table.component.scss'],
    standalone: true
})
export class Invoice6TableComponent {


  public invoice6Data = invoice6;

}
