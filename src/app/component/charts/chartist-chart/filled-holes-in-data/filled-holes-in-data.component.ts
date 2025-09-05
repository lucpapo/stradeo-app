import { Component } from '@angular/core';
import * as chartData from '../../../../shared/data/chart/chartist';
import { ChartistModule } from 'ng-chartist';

@Component({
    selector: 'app-filled-holes-in-data',
    templateUrl: './filled-holes-in-data.component.html',
    styleUrls: ['./filled-holes-in-data.component.scss'],
    standalone: true,
    imports: [ChartistModule]
})
export class FilledHolesInDataComponent {

  public chart12 = chartData.chart12;

}
