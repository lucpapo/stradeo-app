import { Component } from '@angular/core';
import { cartItem } from '../../../shared/data/data/main-ecommerce/cart';
import { RouterLink } from '@angular/router';
import { FeatherIconComponent } from '../../../shared/component/header/feather-icon/feather-icon.component';

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.scss'],
    standalone: true,
    imports: [FeatherIconComponent, RouterLink]
})
export class CartComponent {

  public cartData = cartItem;

  decrement(id: number) {
    if (this.cartData[id - 1].counter > 1) {
      this.cartData[id - 1].counter -= 1;
    }
  }

  increment(id: number) {
    this.cartData[id - 1].counter += 1;
  }

}
