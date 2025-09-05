import { Component } from '@angular/core';
import { HorizontalStyleComponent } from './horizontal-style/horizontal-style.component';
import { VerticalStyleComponent } from './vertical-style/vertical-style.component';
import { InlineStyleComponent } from './inline-style/inline-style.component';
import { OfferStyleBorderComponent } from './offer-style-border/offer-style-border.component';
import { SolidBorderStyleComponent } from './solid-border-style/solid-border-style.component';
import { WithoutBordersStyleComponent } from './without-borders-style/without-borders-style.component';
import { DefaultStyleComponent } from './default-style/default-style.component';
import { VariationCheckboxComponent } from './variation-checkbox/variation-checkbox.component';
import { VariationRadioComponent } from './variation-radio/variation-radio.component';

@Component({
    selector: 'app-mega-options',
    templateUrl: './mega-options.component.html',
    styleUrls: ['./mega-options.component.scss'],
    standalone: true,
    imports: [VariationRadioComponent, VariationCheckboxComponent, DefaultStyleComponent, WithoutBordersStyleComponent, SolidBorderStyleComponent, OfferStyleBorderComponent, InlineStyleComponent, VerticalStyleComponent, HorizontalStyleComponent]
})
export class MegaOptionsComponent {

}
