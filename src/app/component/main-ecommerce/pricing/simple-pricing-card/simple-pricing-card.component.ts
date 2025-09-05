import { Component } from '@angular/core';
import { simplePricingCard } from '../../../../shared/data/data/main-ecommerce/pricing';

@Component({
    selector: 'app-simple-pricing-card',
    templateUrl: './simple-pricing-card.component.html',
    styleUrls: ['./simple-pricing-card.component.scss'],
    standalone: true
})
export class SimplePricingCardComponent {

  public simplePricing = simplePricingCard;

}
