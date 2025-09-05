import { Component } from '@angular/core';
import * as chartData from '../../../../shared/data/chart/google-chart';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';

@Component({
    selector: 'app-column-chart2',
    templateUrl: './column-chart2.component.html',
    styleUrls: ['./column-chart2.component.scss'],
    standalone: true,
    imports: [Ng2GoogleChartsModule]
})
export class ColumnChart2Component {

  public columnChart2 = chartData.columnChart2;

}
