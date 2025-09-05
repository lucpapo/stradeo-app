import { Component } from '@angular/core';
import { CommonOutline } from '../../../../shared/data/data/buttons/button-group';

@Component({
    selector: 'app-outline-edges-button',
    templateUrl: './outline-edges-button.component.html',
    styleUrls: ['./outline-edges-button.component.scss'],
    standalone: true
})
export class OutlineEdgesButtonComponent {

  public outlineData = CommonOutline;

}
