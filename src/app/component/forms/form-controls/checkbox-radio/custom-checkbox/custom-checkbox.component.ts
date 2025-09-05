import { Component } from '@angular/core';
import { BorderCheckbox, IconsCheckbox, FilledCheckbox } from '../../../../../shared/data/data/forms/form-controls/checkbox-radio';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-custom-checkbox',
    templateUrl: './custom-checkbox.component.html',
    styleUrls: ['./custom-checkbox.component.scss'],
    standalone: true,
    imports: [FormsModule]
})
export class CustomCheckboxComponent {

  public borders = BorderCheckbox;
  public icons = IconsCheckbox;
  public filled = FilledCheckbox;

}
