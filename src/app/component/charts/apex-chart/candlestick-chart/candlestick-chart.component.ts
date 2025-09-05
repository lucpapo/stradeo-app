import { Component } from '@angular/core';
import * as chartData from '../../../../shared/data/chart/apex-charts';
import { NgApexchartsModule } from 'ng-apexcharts';

@Component({
    selector: 'app-candlestick-chart',
    templateUrl: './candlestick-chart.component.html',
    styleUrls: ['./candlestick-chart.component.scss'],
    standalone: true,
    imports: [NgApexchartsModule]
})
export class CandlestickChartComponent {

  public candlestickChart = chartData.candlestickChart;

}
