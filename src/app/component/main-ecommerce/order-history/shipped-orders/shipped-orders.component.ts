import { Component } from '@angular/core';
import { shippedOrders, Order } from '../../../../shared/data/data/main-ecommerce/orders';
import { NgbRatingConfig, NgbRating } from '@ng-bootstrap/ng-bootstrap';
import { FeatherIconComponent } from '../../../../shared/component/header/feather-icon/feather-icon.component';

@Component({
    selector: 'app-shipped-orders',
    templateUrl: './shipped-orders.component.html',
    styleUrls: ['./shipped-orders.component.scss'],
    standalone: true,
    imports: [NgbRating, FeatherIconComponent]
})

export class ShippedOrdersComponent {

  public shipped = shippedOrders;
  public rating = 5;

  constructor(public config: NgbRatingConfig) {
    config.max = 5; config.readonly = true;
  }

  close(item: Order) {
    this.shipped.splice(this.shipped.indexOf(item), 1);
  }

}
