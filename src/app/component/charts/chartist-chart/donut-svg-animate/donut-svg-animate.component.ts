import { Component } from '@angular/core';
import * as chartData from '../../../../shared/data/chart/chartist';
import { ChartistModule } from 'ng-chartist';

@Component({
    selector: 'app-donut-svg-animate',
    templateUrl: './donut-svg-animate.component.html',
    styleUrls: ['./donut-svg-animate.component.scss'],
    standalone: true,
    imports: [ChartistModule]
})
export class DonutSvgAnimateComponent {

  public chart3 = chartData.chart3;

}
