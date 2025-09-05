import { Component } from '@angular/core';
import * as chartData from '../../../../shared/data/chart/google-chart';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';

@Component({
    selector: 'app-pie-chart4',
    templateUrl: './pie-chart4.component.html',
    styleUrls: ['./pie-chart4.component.scss'],
    standalone: true,
    imports: [Ng2GoogleChartsModule]
})
export class PieChart4Component {

  public pieChart4 = chartData.pieChart4;

}
