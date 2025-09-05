import { Component } from '@angular/core';
import { commonGroupButton } from '../../../../shared/data/data/buttons/button-group';

@Component({
    selector: 'app-basic-button-group',
    templateUrl: './basic-button-group.component.html',
    styleUrls: ['./basic-button-group.component.scss'],
    standalone: true
})
export class BasicButtonGroupComponent {

  public basicGroundData = commonGroupButton;

}
