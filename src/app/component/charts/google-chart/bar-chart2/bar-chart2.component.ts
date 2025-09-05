import { Component } from '@angular/core';
import * as chartData from '../../../../shared/data/chart/google-chart';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';

@Component({
    selector: 'app-bar-chart2',
    templateUrl: './bar-chart2.component.html',
    styleUrls: ['./bar-chart2.component.scss'],
    standalone: true,
    imports: [Ng2GoogleChartsModule]
})
export class BarChart2Component {

  public barChart2 = chartData.barChart2;

}
