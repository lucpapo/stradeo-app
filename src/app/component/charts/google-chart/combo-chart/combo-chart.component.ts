import { Component } from '@angular/core';
import * as chartData from '../../../../shared/data/chart/google-chart';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';

@Component({
    selector: 'app-combo-chart',
    templateUrl: './combo-chart.component.html',
    styleUrls: ['./combo-chart.component.scss'],
    standalone: true,
    imports: [Ng2GoogleChartsModule]
})
export class ComboChartComponent {

  public comboChart = chartData.comboChart;

}
