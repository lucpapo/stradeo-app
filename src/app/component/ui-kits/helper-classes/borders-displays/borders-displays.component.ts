import { Component } from '@angular/core';
import * as  borderData from '../../../../shared/data/data/ui-kits/helper-classes';
import { CommonBorderDisplaysComponent } from './common-border-displays/common-border-displays.component';

@Component({
    selector: 'app-borders-displays',
    templateUrl: './borders-displays.component.html',
    styleUrls: ['./borders-displays.component.scss'],
    standalone: true,
    imports: [CommonBorderDisplaysComponent]
})
export class BordersDisplaysComponent {

  public additiveBorder = borderData.additiveBorderData;
  public subtractiveBorder = borderData.subtractiveBorder;
  public additiveRadiusData = borderData.additiveRadius;

}
