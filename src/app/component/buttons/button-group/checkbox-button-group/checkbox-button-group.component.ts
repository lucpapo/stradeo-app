import { Component } from '@angular/core';
import { checkboxData } from '../../../../shared/data/data/buttons/button-group';

@Component({
    selector: 'app-checkbox-button-group',
    templateUrl: './checkbox-button-group.component.html',
    styleUrls: ['./checkbox-button-group.component.scss'],
    standalone: true
})
export class CheckboxButtonGroupComponent {

  public checkBox = checkboxData;

}
