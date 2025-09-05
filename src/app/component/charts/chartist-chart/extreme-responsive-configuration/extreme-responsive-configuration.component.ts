import { Component } from '@angular/core';
import * as chartData from '../../../../shared/data/chart/chartist';
import { ChartistModule } from 'ng-chartist';

@Component({
    selector: 'app-extreme-responsive-configuration',
    templateUrl: './extreme-responsive-configuration.component.html',
    styleUrls: ['./extreme-responsive-configuration.component.scss'],
    standalone: true,
    imports: [ChartistModule]
})
export class ExtremeResponsiveConfigurationComponent {

  public chart9 = chartData.chart9;


}
