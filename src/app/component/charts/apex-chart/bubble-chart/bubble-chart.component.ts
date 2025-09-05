import { Component } from '@angular/core';
import * as chartData from '../../../../shared/data/chart/apex-charts';
import { NgApexchartsModule } from 'ng-apexcharts';

@Component({
    selector: 'app-bubble-chart',
    templateUrl: './bubble-chart.component.html',
    styleUrls: ['./bubble-chart.component.scss'],
    standalone: true,
    imports: [NgApexchartsModule]
})
export class BubbleChartComponent {

  public bubbleChart = chartData.bubbleChart

}
