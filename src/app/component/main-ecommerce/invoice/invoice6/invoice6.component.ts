import { Component } from '@angular/core';
import { NgxPrintModule } from 'ngx-print';
import { Invoice6TableComponent } from './invoice6-table/invoice6-table.component';
import { Invoice6TopComponent } from './invoice6-top/invoice6-top.component';

@Component({
    selector: 'app-invoice6',
    templateUrl: './invoice6.component.html',
    styleUrls: ['./invoice6.component.scss'],
    standalone: true,
    imports: [Invoice6TopComponent, Invoice6TableComponent, NgxPrintModule]
})
export class Invoice6Component {



}
