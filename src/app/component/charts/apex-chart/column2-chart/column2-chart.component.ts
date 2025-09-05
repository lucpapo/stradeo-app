import { Component } from '@angular/core';
import * as chartData from '../../../../shared/data/chart/apex-charts';
import { NgApexchartsModule } from 'ng-apexcharts';

@Component({
    selector: 'app-column2-chart',
    templateUrl: './column2-chart.component.html',
    styleUrls: ['./column2-chart.component.scss'],
    standalone: true,
    imports: [NgApexchartsModule]
})
export class Column2ChartComponent {

  public columnChart2 = chartData.columnChart2;

}
