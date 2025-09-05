import { Component } from '@angular/core';
import { invoice5 } from '../../../../../shared/data/data/main-ecommerce/invoice';

@Component({
    selector: 'app-invoice5-table',
    templateUrl: './invoice5-table.component.html',
    styleUrls: ['./invoice5-table.component.scss'],
    standalone: true
})
export class Invoice5TableComponent {

  public invoice5Data = invoice5;

}
