import { Component } from '@angular/core';
import * as widgetChat from '../../../../shared/data/chart/widgets';
import { NgApexchartsModule } from 'ng-apexcharts';

@Component({
    selector: 'app-monthly-sales',
    templateUrl: './monthly-sales.component.html',
    styleUrls: ['./monthly-sales.component.scss'],
    standalone: true,
    imports: [NgApexchartsModule]
})
export class MonthlySalesComponent {

  public MonthlySalesChart = widgetChat.MonthlySalesChart;

}
