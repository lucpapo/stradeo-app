import { Component } from '@angular/core';
import { NgbRatingConfig, NgbRating } from '@ng-bootstrap/ng-bootstrap';
import { cancelledOrders, Order } from '../../../../shared/data/data/main-ecommerce/orders';
import { FeatherIconComponent } from '../../../../shared/component/header/feather-icon/feather-icon.component';

@Component({
    selector: 'app-cancelled-orders',
    templateUrl: './cancelled-orders.component.html',
    styleUrls: ['./cancelled-orders.component.scss'],
    standalone: true,
    imports: [NgbRating, FeatherIconComponent]
})
export class CancelledOrdersComponent {

  public cancelled = cancelledOrders;
  public rating = 5;

  constructor(public config: NgbRatingConfig) {
    config.max = 5; config.readonly = true;
  }

  close(item: Order) {
    this.cancelled.splice(this.cancelled.indexOf(item), 1);
  }

}
