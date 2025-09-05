import { Component } from '@angular/core';
import { RadialBarChartComponent } from './radial-bar-chart/radial-bar-chart.component';
import { RadarChartComponent } from './radar-chart/radar-chart.component';
import { CandlestickChartComponent } from './candlestick-chart/candlestick-chart.component';
import { MixedChartComponent } from './mixed-chart/mixed-chart.component';
import { DonutChartComponent } from './donut-chart/donut-chart.component';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { Column2ChartComponent } from './column2-chart/column2-chart.component';
import { StepLineChartComponent } from './step-line-chart/step-line-chart.component';
import { BubbleChartComponent } from './bubble-chart/bubble-chart.component';
import { ColumnChartComponent } from './column-chart/column-chart.component';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { AreaSpaLineChartComponent } from './area-spa-line-chart/area-spa-line-chart.component';
import { BasicAreaChartComponent } from './basic-area-chart/basic-area-chart.component';

@Component({
    selector: 'app-apex-chart',
    templateUrl: './apex-chart.component.html',
    styleUrls: ['./apex-chart.component.scss'],
    standalone: true,
    imports: [BasicAreaChartComponent, AreaSpaLineChartComponent, 
        BarChartComponent, ColumnChartComponent, BubbleChartComponent, 
        StepLineChartComponent, Column2ChartComponent, PieChartComponent, 
        DonutChartComponent, MixedChartComponent, CandlestickChartComponent, 
        RadarChartComponent, RadialBarChartComponent]
})

export class ApexChartComponent {

}
