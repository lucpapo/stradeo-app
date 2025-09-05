import { Component } from '@angular/core';
import * as chartData from '../../../../shared/data/chart/apex-charts';
import { NgApexchartsModule } from 'ng-apexcharts';

@Component({
    selector: 'app-area-spa-line-chart',
    templateUrl: './area-spa-line-chart.component.html',
    styleUrls: ['./area-spa-line-chart.component.scss'],
    standalone: true,
    imports: [NgApexchartsModule]
})

export class AreaSpaLineChartComponent {

  public areaSpaLineChart = chartData.areaSpaLineChart;

}
