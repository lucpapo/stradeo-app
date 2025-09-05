import { Component } from '@angular/core';
import * as chartData from '../../../../shared/data/chart/apex-charts';
import { NgApexchartsModule } from 'ng-apexcharts';

@Component({
    selector: 'app-radial-bar-chart',
    templateUrl: './radial-bar-chart.component.html',
    styleUrls: ['./radial-bar-chart.component.scss'],
    standalone: true,
    imports: [NgApexchartsModule]
})
export class RadialBarChartComponent {

  public radialBarChart = chartData.radialBarChart

}
