import { Component } from '@angular/core';
import { unOrderList, orderList } from '../../,./../../../shared/data/data/ui-kits/typogaraphy';

@Component({
    selector: 'app-listing-typography',
    templateUrl: './listing-typography.component.html',
    styleUrls: ['./listing-typography.component.scss'],
    standalone: true
})
export class ListingTypographyComponent {

  public listData = unOrderList;
  public orderData = orderList;

}
