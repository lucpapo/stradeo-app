import { Component } from '@angular/core';
import { socialMedia, paymentData } from '../../../../../shared/data/data/forms/form-controls/checkbox-radio';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-animated-buttons',
    templateUrl: './animated-buttons.component.html',
    styleUrls: ['./animated-buttons.component.scss'],
    standalone: true,
    imports: [FormsModule]
})
export class AnimatedButtonsComponent {

  public SoicalmidiaData = socialMedia;
  public payment = paymentData;

}
