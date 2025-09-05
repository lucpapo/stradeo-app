import { Component } from '@angular/core';
import { commonGroupButton } from '../../../../shared/data/data/buttons/button-group';

@Component({
    selector: 'app-large-button-group',
    templateUrl: './large-button-group.component.html',
    styleUrls: ['./large-button-group.component.scss'],
    standalone: true
})
export class LargeButtonGroupComponent {

  public largeButtonGroup = commonGroupButton;

}
