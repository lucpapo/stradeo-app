import { Component } from '@angular/core';
import { NgxPrintModule } from 'ngx-print';
import { TotalInvoice2Component } from './total-invoice2/total-invoice2.component';
import { Invoice2TableComponent } from './invoice2-table/invoice2-table.component';
import { Invoice2TopComponent } from './invoice2-top/invoice2-top.component';

@Component({
    selector: 'app-invoice2',
    templateUrl: './invoice2.component.html',
    styleUrls: ['./invoice2.component.scss'],
    standalone: true,
    imports: [Invoice2TopComponent, Invoice2TableComponent, TotalInvoice2Component, NgxPrintModule]
})
export class Invoice2Component {

}
