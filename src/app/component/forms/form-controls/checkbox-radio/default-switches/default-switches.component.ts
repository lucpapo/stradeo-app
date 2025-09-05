import { Component } from '@angular/core';
import { defaultSwitch } from '../../../../../shared/data/data/forms/form-controls/checkbox-radio';

@Component({
    selector: 'app-default-switches',
    templateUrl: './default-switches.component.html',
    styleUrls: ['./default-switches.component.scss'],
    standalone: true
})
export class DefaultSwitchesComponent {

  public switches = defaultSwitch;

}
