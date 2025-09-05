import { Component } from '@angular/core';
import { CommonOutline } from '../../../../shared/data/data/buttons/button-group';

@Component({
    selector: 'app-outline-button-group',
    templateUrl: './outline-button-group.component.html',
    styleUrls: ['./outline-button-group.component.scss'],
    standalone: true
})
export class OutlineButtonGroupComponent {

  public outlineData = CommonOutline;

}
