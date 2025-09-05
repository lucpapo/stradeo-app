import { Component } from '@angular/core';
import { FilledHolesInDataComponent } from './filled-holes-in-data/filled-holes-in-data.component';
import { HolesInDataComponent } from './holes-in-data/holes-in-data.component';
import { SimpleLineChartComponent } from './simple-line-chart/simple-line-chart.component';
import { ExtremeResponsiveConfigurationComponent } from './extreme-responsive-configuration/extreme-responsive-configuration.component';
import { HorizontalBarChartComponent } from './horizontal-bar-chart/horizontal-bar-chart.component';
import { StackedBarChartComponent } from './stacked-bar-chart/stacked-bar-chart.component';
import { BiPolarBarChartComponent } from './bi-polar-bar-chart/bi-polar-bar-chart.component';
import { LineChartAreaComponent } from './line-chart-area/line-chart-area.component';
import { BiPolarLineChartAreaComponent } from './bi-polar-line-chart-area/bi-polar-line-chart-area.component';
import { DonutSvgAnimateComponent } from './donut-svg-animate/donut-svg-animate.component';
import { SvgPathComponent } from './svg-path/svg-path.component';
import { AdvancedSmilComponent } from './advanced-smil/advanced-smil.component';

@Component({
    selector: 'app-chartist-chart',
    templateUrl: './chartist-chart.component.html',
    styleUrls: ['./chartist-chart.component.scss'],
    standalone: true,
    imports: [AdvancedSmilComponent, SvgPathComponent, DonutSvgAnimateComponent, 
        BiPolarLineChartAreaComponent, LineChartAreaComponent, BiPolarBarChartComponent,
         StackedBarChartComponent, HorizontalBarChartComponent, ExtremeResponsiveConfigurationComponent, 
         SimpleLineChartComponent, HolesInDataComponent, FilledHolesInDataComponent]
})

export class ChartistChartComponent {

}
