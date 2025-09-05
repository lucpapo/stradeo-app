import { Component } from '@angular/core';
import { checkBox, themeSales } from '../../../../../shared/data/data/forms/form-controls/mega-options';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-variation-checkbox',
    templateUrl: './variation-checkbox.component.html',
    styleUrls: ['./variation-checkbox.component.scss'],
    standalone: true,
    imports: [FormsModule]
})
export class VariationCheckboxComponent {

  public checkboxData = checkBox;
  public themeData = themeSales;

}
