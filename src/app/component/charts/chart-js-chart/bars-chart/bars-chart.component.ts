import { Component } from '@angular/core';
import * as chartData from '../../../../shared/data/chart/chartsjs';
import { BaseChartDirective } from 'ng2-charts';

@Component({
    selector: 'app-bars-chart',
    templateUrl: './bars-chart.component.html',
    styleUrls: ['./bars-chart.component.scss'],
    standalone: true,
    imports: [BaseChartDirective]
})
export class BarsChartComponent {

  public barChartChartLabels = chartData.barChartChartLabels;
  public barChartChartData = chartData.barChartChartData;
  public barChartChartType = chartData.barChartChartType;
  public barChartChartColors = chartData.barChartChartColors;
  public barChartChartOptions = chartData.barChartChartOptions;
  public barChartChartLegend = chartData.barChartChartLegend;


}
