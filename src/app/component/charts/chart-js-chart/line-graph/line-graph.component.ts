import { Component } from '@angular/core';
import * as chartData from '../../../../shared/data/chart/chartsjs';
import { BaseChartDirective } from 'ng2-charts';

@Component({
    selector: 'app-line-graph',
    templateUrl: './line-graph.component.html',
    styleUrls: ['./line-graph.component.scss'],
    standalone: true,
    imports: [BaseChartDirective]
})
export class LineGraphComponent {

  public lineGraphOptions = chartData.lineGraphOptions;
  public lineGraphLabels = chartData.lineGraphLabels;
  public lineGraphType = chartData.lineGraphType;
  public lineGraphLegend = chartData.lineGraphLegend;
  public lineGraphData = chartData.lineGraphData;

}
