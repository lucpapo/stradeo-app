import { Component } from '@angular/core';
import { SimplePricingCardComponent } from './simple-pricing-card/simple-pricing-card.component';
import { BecomeMemberComponent } from './become-member/become-member.component';

@Component({
    selector: 'app-pricing',
    templateUrl: './pricing.component.html',
    styleUrls: ['./pricing.component.scss'],
    standalone: true,
    imports: [BecomeMemberComponent, SimplePricingCardComponent]
})
export class PricingComponent {

}
