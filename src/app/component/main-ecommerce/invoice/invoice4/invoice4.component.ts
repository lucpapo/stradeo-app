import { Component } from '@angular/core';
import { NgxPrintModule } from 'ngx-print';
import { TotalInvoice4Component } from './total-invoice4/total-invoice4.component';
import { Invoice4TableComponent } from './invoice4-table/invoice4-table.component';
import { Invoice4TopComponent } from './invoice4-top/invoice4-top.component';

@Component({
    selector: 'app-invoice4',
    templateUrl: './invoice4.component.html',
    styleUrls: ['./invoice4.component.scss'],
    standalone: true,
    imports: [Invoice4TopComponent, Invoice4TableComponent, TotalInvoice4Component, NgxPrintModule]
})
export class Invoice4Component {

}
