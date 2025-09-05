import { Component } from '@angular/core';
import { IconSwitch } from '../../../../../shared/data/data/forms/forms-widgets/switch';

@Component({
    selector: 'app-icons-switch',
    templateUrl: './icons-switch.component.html',
    styleUrls: ['./icons-switch.component.scss'],
    standalone: true
})
export class IconsSwitchComponent {

  public iconsData = IconSwitch;

}
