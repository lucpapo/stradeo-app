import { Component } from '@angular/core';
import { customSwitch } from '../../../../../shared/data/data/forms/forms-widgets/switch';

@Component({
    selector: 'app-custom-switch',
    templateUrl: './custom-switch.component.html',
    styleUrls: ['./custom-switch.component.scss'],
    standalone: true
})
export class CustomSwitchComponent {

  public customData = customSwitch;

}
