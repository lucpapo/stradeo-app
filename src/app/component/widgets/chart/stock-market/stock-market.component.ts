import { Component } from '@angular/core';
import * as widgetChat from '../../../../shared/data/chart/widgets';
import { NgApexchartsModule } from 'ng-apexcharts';

@Component({
    selector: 'app-stock-market',
    templateUrl: './stock-market.component.html',
    styleUrls: ['./stock-market.component.scss'],
    standalone: true,
    imports: [NgApexchartsModule]
})
export class StockMarketComponent {

  public StockMarketChart = widgetChat.StockMarketChart;

}
