import { Component } from '@angular/core';
import { AdvertisementComponent } from "./advertisement/advertisement.component";
import { WeeklyRevenueGrowthComponent } from "./weekly-revenue-growth/weekly-revenue-growth.component";
import { ClearInvoicingComponent } from "./clear-invoicing/clear-invoicing.component";
import { EventDetailsComponent } from "./event-details/event-details.component";
import { SellingConnectionsComponent } from "./selling-connections/selling-connections.component";
import { InformationComponent } from "./information/information.component";
import { DutiesOfTodayComponent } from "./duties-of-today/duties-of-today.component";
import { FreshUpgradeComponent } from "./fresh-upgrade/fresh-upgrade.component";
import { SalesTrendComponent } from "./sales-trend/sales-trend.component";

@Component({
  selector: 'app-default',
  standalone: true,
  imports: [AdvertisementComponent, WeeklyRevenueGrowthComponent, 
    ClearInvoicingComponent, EventDetailsComponent, SellingConnectionsComponent, 
    InformationComponent, DutiesOfTodayComponent, FreshUpgradeComponent, 
    SalesTrendComponent],
  templateUrl: './default.component.html',
  styleUrl: './default.component.scss'
})

export class DefaultComponent {

}
