import { Component } from '@angular/core';
import * as chartData from '../../../../shared/data/chart/google-chart';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';

@Component({
    selector: 'app-pie-chart1',
    templateUrl: './pie-chart1.component.html',
    styleUrls: ['./pie-chart1.component.scss'],
    standalone: true,
    imports: [Ng2GoogleChartsModule]
})
export class PieChart1Component {

  public pieChart1 = chartData.pieChart1

}
