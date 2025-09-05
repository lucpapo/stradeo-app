import { Component } from '@angular/core';
import * as chartData from '../../../../shared/data/chart/chartist';
import { ChartistModule } from 'ng-chartist';

@Component({
    selector: 'app-holes-in-data',
    templateUrl: './holes-in-data.component.html',
    styleUrls: ['./holes-in-data.component.scss'],
    standalone: true,
    imports: [ChartistModule]
})
export class HolesInDataComponent {

  public chart11 = chartData.chart11;

}
