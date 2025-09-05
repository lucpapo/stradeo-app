import { Component } from '@angular/core';
import { customHeightProgress } from '../../../../shared/data/data/ui-kits/progress';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-custom-height-progress-bars',
    templateUrl: './custom-height-progress-bars.component.html',
    styleUrls: ['./custom-height-progress-bars.component.scss'],
    standalone: true,
    imports: [CommonModule]
})
export class CustomHeightProgressBarsComponent {

  public customHeightData = customHeightProgress;

}
