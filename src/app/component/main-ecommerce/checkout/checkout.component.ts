import { Component } from '@angular/core';
import { ProductTotalComponent } from './product-total/product-total.component';
import { BillingDetailsComponent } from './billing-details/billing-details.component';

@Component({
    selector: 'app-checkout',
    templateUrl: './checkout.component.html',
    styleUrls: ['./checkout.component.scss'],
    standalone: true,
    imports: [BillingDetailsComponent, ProductTotalComponent]
})
export class CheckoutComponent {

}
