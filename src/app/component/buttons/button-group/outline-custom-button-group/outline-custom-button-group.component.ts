import { Component } from '@angular/core';
import { outlineData } from '../../../../shared/data/data/buttons/button-group';

@Component({
    selector: 'app-outline-custom-button-group',
    templateUrl: './outline-custom-button-group.component.html',
    styleUrls: ['./outline-custom-button-group.component.scss'],
    standalone: true
})
export class OutlineCustomButtonGroupComponent {

  public outlineButtonData = outlineData;

}
