import { Component } from '@angular/core';
import { UncheckedSwitch } from '../../../../../shared/data/data/forms/forms-widgets/switch';

@Component({
    selector: 'app-unchecked-switch',
    templateUrl: './unchecked-switch.component.html',
    styleUrls: ['./unchecked-switch.component.scss'],
    standalone: true
})
export class UncheckedSwitchComponent {

  public uncheckedData = UncheckedSwitch;

}
