import { Component } from '@angular/core';
import { disabledOutlineSwitch } from '../../../../../shared/data/data/forms/forms-widgets/switch';

@Component({
    selector: 'app-disabled-outline-switch',
    templateUrl: './disabled-outline-switch.component.html',
    styleUrls: ['./disabled-outline-switch.component.scss'],
    standalone: true
})
export class DisabledOutlineSwitchComponent {

  public disableOutline = disabledOutlineSwitch;

}
