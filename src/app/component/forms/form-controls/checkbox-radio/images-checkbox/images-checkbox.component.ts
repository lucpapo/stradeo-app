import { Component } from '@angular/core';
import { imageCheckbox } from '../../../../../shared/data/data/forms/form-controls/checkbox-radio';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-images-checkbox',
    templateUrl: './images-checkbox.component.html',
    styleUrls: ['./images-checkbox.component.scss'],
    standalone: true,
    imports: [FormsModule]
})
export class ImagesCheckboxComponent {

  public imgcheckboxData = imageCheckbox;

}
