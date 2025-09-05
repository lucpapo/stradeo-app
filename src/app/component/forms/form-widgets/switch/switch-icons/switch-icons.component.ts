import { Component } from '@angular/core';
import { iconSwitchSizing } from '../../../../../shared/data/data/forms/forms-widgets/switch';

@Component({
    selector: 'app-switch-icons',
    templateUrl: './switch-icons.component.html',
    styleUrls: ['./switch-icons.component.scss'],
    standalone: true
})
export class SwitchIconsComponent {

  public iconSizingData = iconSwitchSizing;

}
