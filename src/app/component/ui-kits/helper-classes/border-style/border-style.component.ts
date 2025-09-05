import { Component } from '@angular/core';
import * as  borderData from '../../../../shared/data/data/ui-kits/helper-classes';
import { CommonBorderStyleComponent } from './common-border-style/common-border-style.component';

@Component({
    selector: 'app-border-style',
    templateUrl: './border-style.component.html',
    styleUrls: ['./border-style.component.scss'],
    standalone: true,
    imports: [CommonBorderStyleComponent]
})

export class BorderStyleComponent {

  public customBorder = borderData.customBorder;
  public borderColor = borderData.colorBorders;
  public borderWidth = borderData.borderWith;
  public textColors = borderData.textColor;

}
