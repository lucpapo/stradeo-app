import { Component } from '@angular/core';
import { commonGroupButton } from '../../../../shared/data/data/buttons/button-group';

@Component({
    selector: 'app-large-edges-button-group',
    templateUrl: './large-edges-button-group.component.html',
    styleUrls: ['./large-edges-button-group.component.scss'],
    standalone: true
})
export class LargeEdgesButtonGroupComponent {

  public largeButtonGroup = commonGroupButton;


}
