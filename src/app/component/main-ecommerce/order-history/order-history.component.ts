import { Component } from '@angular/core';
import { DataTableOrderHistoryComponent } from './data-table-order-history/data-table-order-history.component';
import { CancelledOrdersComponent } from './cancelled-orders/cancelled-orders.component';
import { ShippedOrdersComponent } from './shipped-orders/shipped-orders.component';
import { NewOrdersComponent } from './new-orders/new-orders.component';

@Component({
    selector: 'app-order-history',
    templateUrl: './order-history.component.html',
    styleUrls: ['./order-history.component.scss'],
    standalone: true,
    imports: [NewOrdersComponent, ShippedOrdersComponent, CancelledOrdersComponent, DataTableOrderHistoryComponent]
})
export class OrderHistoryComponent {

}
