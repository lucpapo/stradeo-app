import { Component } from '@angular/core';
import * as chartData from '../../../../shared/data/chart/google-chart';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';

@Component({
    selector: 'app-column-chart1',
    templateUrl: './column-chart1.component.html',
    styleUrls: ['./column-chart1.component.scss'],
    standalone: true,
    imports: [Ng2GoogleChartsModule]
})
export class ColumnChart1Component {

  public columnChart1 = chartData.columnChart1;

}
