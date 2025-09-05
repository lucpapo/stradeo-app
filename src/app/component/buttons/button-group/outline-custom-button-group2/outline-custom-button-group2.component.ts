import { Component } from '@angular/core';
import { outlineCustomData } from '../../../../shared/data/data/buttons/button-group';

@Component({
    selector: 'app-outline-custom-button-group2',
    templateUrl: './outline-custom-button-group2.component.html',
    styleUrls: ['./outline-custom-button-group2.component.scss'],
    standalone: true
})
export class OutlineCustomButtonGroup2Component {

  public outlineCustom = outlineCustomData;

}
