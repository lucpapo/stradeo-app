import { Component } from '@angular/core';
import * as chartData from '../../../../shared/data/chart/apex-charts';
import { NgApexchartsModule } from 'ng-apexcharts';

@Component({
    selector: 'app-step-line-chart',
    templateUrl: './step-line-chart.component.html',
    styleUrls: ['./step-line-chart.component.scss'],
    standalone: true,
    imports: [NgApexchartsModule]
})
export class StepLineChartComponent {

  public stepLineChart = chartData.stepLineChart;

}
