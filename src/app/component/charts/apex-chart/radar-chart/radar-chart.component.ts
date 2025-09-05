import { Component } from '@angular/core';
import * as chartData from '../../../../shared/data/chart/apex-charts';
import { NgApexchartsModule } from 'ng-apexcharts';

@Component({
    selector: 'app-radar-chart',
    templateUrl: './radar-chart.component.html',
    styleUrls: ['./radar-chart.component.scss'],
    standalone: true,
    imports: [NgApexchartsModule]
})
export class RadarChartComponent {

  public radarChart = chartData.radarChart

}
