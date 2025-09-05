import { Component } from '@angular/core';
import { switchSizing } from '../../../../../shared/data/data/forms/forms-widgets/switch';

@Component({
    selector: 'app-switch-sizing',
    templateUrl: './switch-sizing.component.html',
    styleUrls: ['./switch-sizing.component.scss'],
    standalone: true
})
export class SwitchSizingComponent {

  public sizingData = switchSizing;

}
