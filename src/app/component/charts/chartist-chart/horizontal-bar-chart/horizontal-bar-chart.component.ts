import { Component } from '@angular/core';
import * as chartData from '../../../../shared/data/chart/chartist';
import { ChartistModule } from 'ng-chartist';

@Component({
    selector: 'app-horizontal-bar-chart',
    templateUrl: './horizontal-bar-chart.component.html',
    styleUrls: ['./horizontal-bar-chart.component.scss'],
    standalone: true,
    imports: [ChartistModule]
})
export class HorizontalBarChartComponent {

  public chart8 = chartData.chart8;

}
