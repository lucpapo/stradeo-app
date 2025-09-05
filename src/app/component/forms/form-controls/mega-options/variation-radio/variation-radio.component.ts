import { Component } from '@angular/core';
import { VariationRadioPayment, VariationsWebDesign, variationsIcons } from '../../../../../shared/data/data/forms/form-controls/mega-options';

@Component({
    selector: 'app-variation-radio',
    templateUrl: './variation-radio.component.html',
    styleUrls: ['./variation-radio.component.scss'],
    standalone: true
})
export class VariationRadioComponent {

  public paymentData = VariationRadioPayment;
  public webDesignData = VariationsWebDesign;
  public iconsData = variationsIcons;


}
