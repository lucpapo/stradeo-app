import { Component } from '@angular/core';
import { imageRadio } from '../../../../../shared/data/data/forms/form-controls/checkbox-radio';

@Component({
    selector: 'app-images-radio',
    templateUrl: './images-radio.component.html',
    styleUrls: ['./images-radio.component.scss'],
    standalone: true
})
export class ImagesRadioComponent {

  public imgradioData = imageRadio;

}
