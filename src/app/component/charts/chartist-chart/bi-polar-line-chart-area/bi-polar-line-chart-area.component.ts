import { Component } from '@angular/core';
import * as chartData from '../../../../shared/data/chart/chartist';
import { ChartistModule } from 'ng-chartist';

@Component({
    selector: 'app-bi-polar-line-chart-area',
    templateUrl: './bi-polar-line-chart-area.component.html',
    styleUrls: ['./bi-polar-line-chart-area.component.scss'],
    standalone: true,
    imports: [ChartistModule]
})
export class BiPolarLineChartAreaComponent {

  public chart4 = chartData.chart4;

}
