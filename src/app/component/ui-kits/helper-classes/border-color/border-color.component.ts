import { Component } from '@angular/core';
import { borderColors } from '../../../../shared/data/data/ui-kits/helper-classes';

@Component({
    selector: 'app-border-color',
    templateUrl: './border-color.component.html',
    styleUrls: ['./border-color.component.scss'],
    standalone: true
})
export class BorderColorComponent {

  public borderColorData = borderColors;

}
