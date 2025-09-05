import { Component } from '@angular/core';
import { UsesComponent } from './uses/uses.component';
import { MonthlySalesComponent } from './monthly-sales/monthly-sales.component';
import { OrderStatusComponent } from './order-status/order-status.component';
import { FinanceComponent } from './finance/finance.component';
import { StockMarketComponent } from './stock-market/stock-market.component';
import { CryptoAnnotationsComponent } from './crypto-annotations/crypto-annotations.component';
import { CryptocurrencyPricesComponent } from './cryptocurrency-prices/cryptocurrency-prices.component';
import { TurnOverComponent } from './turn-over/turn-over.component';
import { LiveProductsComponent } from './live-products/live-products.component';
import { MonthlyHistoryComponent } from './monthly-history/monthly-history.component';
import { WidgetSalesOverviewComponent } from './widget-sales-overview/widget-sales-overview.component';
import { ProjectCreatedComponent } from './project-created/project-created.component';
import { TotalProductComponent } from './total-product/total-product.component';
import { TotalProjectComponent } from './total-project/total-project.component';
import { TotalSaleGeneralComponent } from './total-sale-general/total-sale-general.component';

@Component({
    selector: 'app-chart',
    templateUrl: './chart.component.html',
    styleUrls: ['./chart.component.scss'],
    standalone: true,
    imports: [TotalSaleGeneralComponent, TotalProjectComponent, TotalProductComponent, 
        ProjectCreatedComponent, WidgetSalesOverviewComponent, MonthlyHistoryComponent, 
        LiveProductsComponent, TurnOverComponent, CryptocurrencyPricesComponent, 
        CryptoAnnotationsComponent, StockMarketComponent, FinanceComponent, 
        OrderStatusComponent, MonthlySalesComponent, UsesComponent]
})
export class ChartComponent {

}
