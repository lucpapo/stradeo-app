import { Component } from '@angular/core';
import * as chartData from '../../../../shared/data/chart/chartist';
import { ChartistModule } from 'ng-chartist';

@Component({
    selector: 'app-line-chart-area',
    templateUrl: './line-chart-area.component.html',
    styleUrls: ['./line-chart-area.component.scss'],
    standalone: true,
    imports: [ChartistModule]
})
export class LineChartAreaComponent {

  public chart5 = chartData.chart5;

}
