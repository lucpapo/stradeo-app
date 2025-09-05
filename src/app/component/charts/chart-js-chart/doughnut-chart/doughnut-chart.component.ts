import { Component } from '@angular/core';
import * as chartData from '../../../../shared/data/chart/chartsjs';
import { BaseChartDirective } from 'ng2-charts';

@Component({
    selector: 'app-doughnut-chart',
    templateUrl: './doughnut-chart.component.html',
    styleUrls: ['./doughnut-chart.component.scss'],
    standalone: true,
    imports: [BaseChartDirective]
})
export class DoughnutChartComponent {

  public doughnutChartLabels = chartData.doughnutChartLabels;
  public doughnutChartData = chartData.doughnutChartData;
  public doughnutChartType = chartData.doughnutChartType;
  public doughnutChartColors = chartData.doughnutChartColors;
  public doughnutChartOptions = chartData.doughnutChartOptions;
  public doughnutChartLegend = chartData.doughnutChartLegend;

}
