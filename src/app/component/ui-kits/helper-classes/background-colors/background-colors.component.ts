import { Component } from '@angular/core';
import * as  borderData from '../../../../shared/data/data/ui-kits/helper-classes';
import { CommonBackgroundComponent } from './common-background/common-background.component';

@Component({
    selector: 'app-background-colors',
    templateUrl: './background-colors.component.html',
    styleUrls: ['./background-colors.component.scss'],
    standalone: true,
    imports: [CommonBackgroundComponent]
})
export class BackgroundColorsComponent {

  public darkBackground = borderData.darkBackground;
  public LightBackgroundsData = borderData.lightBackgrounds;
  public ExtendedBackgroundData = borderData.extendedBackground;

}
