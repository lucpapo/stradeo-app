import { Component } from '@angular/core';
import * as chartData from '../../../../shared/data/chart/chartist';
import { ChartistModule } from 'ng-chartist';

@Component({
    selector: 'app-bi-polar-bar-chart',
    templateUrl: './bi-polar-bar-chart.component.html',
    styleUrls: ['./bi-polar-bar-chart.component.scss'],
    standalone: true,
    imports: [ChartistModule]
})
export class BiPolarBarChartComponent {

  public chart6 = chartData.chart6;

}
