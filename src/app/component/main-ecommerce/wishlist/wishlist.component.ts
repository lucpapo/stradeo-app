import { Component } from '@angular/core';
import { wisList } from '../../../shared/data/data/main-ecommerce/wishlist';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-wishlist',
    templateUrl: './wishlist.component.html',
    styleUrls: ['./wishlist.component.scss'],
    standalone: true,
    imports: [RouterLink]
})
export class WishlistComponent {

  public wishlistData = wisList;

}
