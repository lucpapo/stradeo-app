import { Component } from '@angular/core';
import * as  data from '../../../shared/data/data/ui-kits/progress';
import { CustomHeightProgressBarsComponent } from './custom-height-progress-bars/custom-height-progress-bars.component';
import { LargeProgressBarsComponent } from './large-progress-bars/large-progress-bars.component';
import { SmallProgressBarsComponent } from './small-progress-bars/small-progress-bars.component';
import { CustomProgressBarsComponent } from './custom-progress-bars/custom-progress-bars.component';
import { ProgressNumberStepsComponent } from './progress-number-steps/progress-number-steps.component';
import { MultipleBarsComponent } from './multiple-bars/multiple-bars.component';
import { CommonProgressBarComponent } from './common-progress-bar/common-progress-bar.component';

@Component({
    selector: 'app-progress',
    templateUrl: './progress.component.html',
    styleUrls: ['./progress.component.scss'],
    standalone: true,
    imports: [CommonProgressBarComponent, MultipleBarsComponent, 
      ProgressNumberStepsComponent, CustomProgressBarsComponent, 
      SmallProgressBarsComponent, LargeProgressBarsComponent, 
      CustomHeightProgressBarsComponent]
})
export class ProgressComponent {

  public basicData = data.basicProgress;
  public progressStripedData = data.progressBarsStriped;
  public progressAnimatedData = data.progressBarsAnimated;

}
