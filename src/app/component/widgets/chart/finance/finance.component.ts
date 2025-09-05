import { Component } from '@angular/core';
import * as widgetChat from '../../../../shared/data/chart/widgets';
import { NgApexchartsModule } from 'ng-apexcharts';

@Component({
    selector: 'app-finance',
    templateUrl: './finance.component.html',
    styleUrls: ['./finance.component.scss'],
    standalone: true,
    imports: [NgApexchartsModule]
})
export class FinanceComponent {

  public FinancesChart = widgetChat.FinancesChart;

}
