import { Component } from '@angular/core';
import { basicCheckbox, simpleRadio } from '../../../../../shared/data/data/forms/form-controls/checkbox-radio';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-basic-radio-checkbox',
    templateUrl: './basic-radio-checkbox.component.html',
    styleUrls: ['./basic-radio-checkbox.component.scss'],
    standalone: true,
    imports: [FormsModule]
})
export class BasicRadioCheckboxComponent {

  public basicItem = basicCheckbox;
  public radioData = simpleRadio;

}
