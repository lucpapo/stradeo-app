import { Component } from '@angular/core';
import * as chartData from '../../../../shared/data/chart/chartist';
import { ChartistModule } from 'ng-chartist';

@Component({
    selector: 'app-simple-line-chart',
    templateUrl: './simple-line-chart.component.html',
    styleUrls: ['./simple-line-chart.component.scss'],
    standalone: true,
    imports: [ChartistModule]
})
export class SimpleLineChartComponent {

  public chart10 = chartData.chart10;


}
