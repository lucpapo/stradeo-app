import { Component } from '@angular/core';
import { NgxPrintModule } from 'ngx-print';
import { TotalInvoice3Component } from './total-invoice3/total-invoice3.component';
import { Invoice3TableComponent } from './invoice3-table/invoice3-table.component';
import { Invoice3TopComponent } from './invoice3-top/invoice3-top.component';

@Component({
    selector: 'app-invoice3',
    templateUrl: './invoice3.component.html',
    styleUrls: ['./invoice3.component.scss'],
    standalone: true,
    imports: [Invoice3TopComponent, Invoice3TableComponent, TotalInvoice3Component, NgxPrintModule]
})
export class Invoice3Component {

}
