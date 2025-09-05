import { Component } from '@angular/core';
import * as chartData from '../../../../shared/data/chart/apex-charts';
import { NgApexchartsModule } from 'ng-apexcharts';

@Component({
    selector: 'app-basic-area-chart',
    templateUrl: './basic-area-chart.component.html',
    styleUrls: ['./basic-area-chart.component.scss'],
    standalone: true,
    imports: [NgApexchartsModule]
})

export class BasicAreaChartComponent {

  public basicAreaChart = chartData.splineArea1

}
