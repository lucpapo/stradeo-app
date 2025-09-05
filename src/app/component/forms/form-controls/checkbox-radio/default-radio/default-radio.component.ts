import { Component } from '@angular/core';
import { defaultRadio } from '../../../../../shared/data/data/forms/form-controls/checkbox-radio';

@Component({
    selector: 'app-default-radio',
    templateUrl: './default-radio.component.html',
    styleUrls: ['./default-radio.component.scss'],
    standalone: true
})
export class DefaultRadioComponent {

  public redio = defaultRadio;

}
