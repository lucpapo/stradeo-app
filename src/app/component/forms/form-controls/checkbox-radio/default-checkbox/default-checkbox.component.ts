import { Component } from '@angular/core';
import { checkbox } from '../../../../../shared/data/data/forms/form-controls/checkbox-radio';

@Component({
    selector: 'app-default-checkbox',
    templateUrl: './default-checkbox.component.html',
    styleUrls: ['./default-checkbox.component.scss'],
    standalone: true
})
export class DefaultCheckboxComponent {

  public checkboxData = checkbox;

}
