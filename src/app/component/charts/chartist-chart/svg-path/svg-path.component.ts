import { Component } from '@angular/core';
import * as chartData from '../../../../shared/data/chart/chartist';
import { ChartistModule } from 'ng-chartist';

@Component({
    selector: 'app-svg-path',
    templateUrl: './svg-path.component.html',
    styleUrls: ['./svg-path.component.scss'],
    standalone: true,
    imports: [ChartistModule]
})
export class SvgPathComponent {

  public chart2 = chartData.chart2;

}
