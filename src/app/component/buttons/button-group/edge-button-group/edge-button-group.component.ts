import { Component } from '@angular/core';
import { commonGroupButton } from '../../../../shared/data/data/buttons/button-group';

@Component({
    selector: 'app-edge-button-group',
    templateUrl: './edge-button-group.component.html',
    styleUrls: ['./edge-button-group.component.scss'],
    standalone: true
})
export class EdgeButtonGroupComponent {

  public edgeGroupData = commonGroupButton;

}
