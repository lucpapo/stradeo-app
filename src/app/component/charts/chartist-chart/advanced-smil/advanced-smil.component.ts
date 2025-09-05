import { Component } from '@angular/core';
import * as chartData from '../../../../shared/data/chart/chartist';
import { ChartistModule } from 'ng-chartist';


@Component({
    selector: 'app-advanced-smil',
    templateUrl: './advanced-smil.component.html',
    styleUrls: ['./advanced-smil.component.scss'],
    standalone: true,
    imports: [ChartistModule]
})
export class AdvancedSmilComponent {

  public chart1 = chartData.chart1;

}
