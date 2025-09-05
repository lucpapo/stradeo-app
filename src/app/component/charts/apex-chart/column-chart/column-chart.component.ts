import { Component } from '@angular/core';
import * as chartData from '../../../../shared/data/chart/apex-charts';
import { NgApexchartsModule } from 'ng-apexcharts';

@Component({
    selector: 'app-column-chart',
    templateUrl: './column-chart.component.html',
    styleUrls: ['./column-chart.component.scss'],
    standalone: true,
    imports: [NgApexchartsModule]
})

export class ColumnChartComponent {

  public columnChart = chartData.columnChart

}
