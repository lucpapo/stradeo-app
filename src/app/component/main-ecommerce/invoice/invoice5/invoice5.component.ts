import { Component } from '@angular/core';
import { NgxPrintModule } from 'ngx-print';
import { Invoice5TableComponent } from './invoice5-table/invoice5-table.component';
import { Invoice5TopComponent } from './invoice5-top/invoice5-top.component';

@Component({
    selector: 'app-invoice5',
    templateUrl: './invoice5.component.html',
    styleUrls: ['./invoice5.component.scss'],
    standalone: true,
    imports: [Invoice5TopComponent, Invoice5TableComponent, NgxPrintModule]
})
export class Invoice5Component {

}
