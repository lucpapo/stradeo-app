import { Component } from '@angular/core';
import { NgxPrintModule } from 'ngx-print';
import { Invoice1TableComponent } from './invoice1-table/invoice1-table.component';

@Component({
    selector: 'app-invoice1',
    templateUrl: './invoice1.component.html',
    styleUrls: ['./invoice1.component.scss'],
    standalone: true,
    imports: [Invoice1TableComponent, NgxPrintModule]
})

export class Invoice1Component {

}
