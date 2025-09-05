import { Component } from '@angular/core';
import * as chartData from '../../../../shared/data/chart/apex-charts';
import { NgApexchartsModule } from 'ng-apexcharts';

@Component({
    selector: 'app-donut-chart',
    templateUrl: './donut-chart.component.html',
    styleUrls: ['./donut-chart.component.scss'],
    standalone: true,
    imports: [NgApexchartsModule]
})

export class DonutChartComponent {

  public donutChart = chartData.donutChart;

}
