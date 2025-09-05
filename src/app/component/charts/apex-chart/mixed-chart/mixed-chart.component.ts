import { Component } from '@angular/core';
import * as chartData from '../../../../shared/data/chart/apex-charts';
import { NgApexchartsModule } from 'ng-apexcharts';

@Component({
    selector: 'app-mixed-chart',
    templateUrl: './mixed-chart.component.html',
    styleUrls: ['./mixed-chart.component.scss'],
    standalone: true,
    imports: [NgApexchartsModule]
})
export class MixedChartComponent {

  public mixedChart = chartData.mixedChart

}
