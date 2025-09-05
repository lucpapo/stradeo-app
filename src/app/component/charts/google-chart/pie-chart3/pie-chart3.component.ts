import { Component } from '@angular/core';
import * as chartData from '../../../../shared/data/chart/google-chart';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';

@Component({
    selector: 'app-pie-chart3',
    templateUrl: './pie-chart3.component.html',
    styleUrls: ['./pie-chart3.component.scss'],
    standalone: true,
    imports: [Ng2GoogleChartsModule]
})
export class PieChart3Component {

  public pieChart3 = chartData.pieChart3;

}
