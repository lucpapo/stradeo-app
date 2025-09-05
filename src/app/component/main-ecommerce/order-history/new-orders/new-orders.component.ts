import { Component } from '@angular/core';
import { NgbRatingConfig, NgbRating } from '@ng-bootstrap/ng-bootstrap';
import { newOrders, Order } from '../../../../shared/data/data/main-ecommerce/orders';
import { FeatherIconComponent } from '../../../../shared/component/header/feather-icon/feather-icon.component';

@Component({
    selector: 'app-new-orders',
    templateUrl: './new-orders.component.html',
    styleUrls: ['./new-orders.component.scss'],
    standalone: true,
    imports: [NgbRating, FeatherIconComponent]
})
export class NewOrdersComponent {

  public rating = 5;
  public orders = newOrders;

  constructor(public config: NgbRatingConfig) {
    config.max = 5; config.readonly = true;
  }

  close(item: Order) {
    this.orders.splice(this.orders.indexOf(item), 1);
  }

}
