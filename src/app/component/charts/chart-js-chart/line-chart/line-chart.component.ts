import { Component } from '@angular/core';
import * as chartData from '../../../../shared/data/chart/chartsjs';
import { BaseChartDirective } from 'ng2-charts';

@Component({
    selector: 'app-line-chart',
    templateUrl: './line-chart.component.html',
    styleUrls: ['./line-chart.component.scss'],
    standalone: true,
    imports: [BaseChartDirective]
})
export class LineChartComponent {

  public lineChartOptions = chartData.lineChartOptions;
  public lineChartLabels = chartData.lineChartLabels;
  public lineChartType = chartData.lineChartType;
  public lineChartLegend = chartData.lineChartLegend;
  public lineChartData = chartData.lineChartData;

}
