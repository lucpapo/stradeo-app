import { Component } from '@angular/core';
import * as chartData from '../../../../shared/data/chart/chartsjs';
import { BaseChartDirective } from 'ng2-charts';

@Component({
    selector: 'app-polar-chart',
    templateUrl: './polar-chart.component.html',
    styleUrls: ['./polar-chart.component.scss'],
    standalone: true,
    imports: [BaseChartDirective]
})

export class PolarChartComponent {

  public polarChartLabels = chartData.polarChartLabels;
  public polarChartData = chartData.polarChartData;
  public polarChartType = chartData.polarChartType;
  public polarChartColors = chartData.polarChartColors;
  public polarChartOptions = chartData.polarChartOptions;
  public polarChartLegend = chartData.polarChartLegend;

}
