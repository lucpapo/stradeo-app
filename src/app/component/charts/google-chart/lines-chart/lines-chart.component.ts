import { Component } from '@angular/core';
import * as chartData from '../../../../shared/data/chart/google-chart';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';

@Component({
    selector: 'app-lines-chart',
    templateUrl: './lines-chart.component.html',
    styleUrls: ['./lines-chart.component.scss'],
    standalone: true,
    imports: [Ng2GoogleChartsModule]
})
export class LinesChartComponent {

  public lineChart = chartData.lineChart;

}
