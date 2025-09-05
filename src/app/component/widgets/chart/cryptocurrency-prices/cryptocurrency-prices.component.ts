import { Component } from '@angular/core';
import * as widgetChat from '../../../../shared/data/chart/widgets';
import { NgApexchartsModule } from 'ng-apexcharts';

@Component({
    selector: 'app-cryptocurrency-prices',
    templateUrl: './cryptocurrency-prices.component.html',
    styleUrls: ['./cryptocurrency-prices.component.scss'],
    standalone: true,
    imports: [NgApexchartsModule]
})
export class CryptocurrencyPricesComponent {

  public CryptocurrencyPricesChart = widgetChat.CryptocurrencyPricesChart;

}
