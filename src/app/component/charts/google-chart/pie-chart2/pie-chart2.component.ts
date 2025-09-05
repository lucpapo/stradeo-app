import { Component } from '@angular/core';
import * as chartData from '../../../../shared/data/chart/google-chart';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';

@Component({
    selector: 'app-pie-chart2',
    templateUrl: './pie-chart2.component.html',
    styleUrls: ['./pie-chart2.component.scss'],
    standalone: true,
    imports: [Ng2GoogleChartsModule]
})
export class PieChart2Component {

  public pieChart2 = chartData.pieChart2;

}
