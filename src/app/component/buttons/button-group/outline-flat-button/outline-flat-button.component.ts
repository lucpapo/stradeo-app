import { Component } from '@angular/core';
import { CommonOutline } from '../../../../shared/data/data/buttons/button-group';

@Component({
    selector: 'app-outline-flat-button',
    templateUrl: './outline-flat-button.component.html',
    styleUrls: ['./outline-flat-button.component.scss'],
    standalone: true
})
export class OutlineFlatButtonComponent {

  public outlineData = CommonOutline;

}
