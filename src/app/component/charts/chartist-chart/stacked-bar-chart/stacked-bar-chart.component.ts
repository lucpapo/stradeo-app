import { Component } from '@angular/core';
import * as chartData from '../../../../shared/data/chart/chartist';
import { ChartistModule } from 'ng-chartist';

@Component({
    selector: 'app-stacked-bar-chart',
    templateUrl: './stacked-bar-chart.component.html',
    styleUrls: ['./stacked-bar-chart.component.scss'],
    standalone: true,
    imports: [ChartistModule]
})
export class StackedBarChartComponent {

  public chart7 = chartData.chart7;

}
