import { Component } from '@angular/core';
import { PolarChartComponent } from './polar-chart/polar-chart.component';
import { DoughnutChartComponent } from './doughnut-chart/doughnut-chart.component';
import { LineChartComponent } from './line-chart/line-chart.component';
import { RadarGraphComponent } from './radar-graph/radar-graph.component';
import { LineGraphComponent } from './line-graph/line-graph.component';
import { BarsChartComponent } from './bars-chart/bars-chart.component';

@Component({
    selector: 'app-chart-js-chart',
    templateUrl: './chart-js-chart.component.html',
    styleUrls: ['./chart-js-chart.component.scss'],
    standalone: true,
    imports: [BarsChartComponent, LineGraphComponent, RadarGraphComponent, 
        LineChartComponent, DoughnutChartComponent, PolarChartComponent]
})

export class ChartJsChartComponent {

}
