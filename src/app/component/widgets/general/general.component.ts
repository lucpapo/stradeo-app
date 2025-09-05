import { Component } from '@angular/core';
import * as data from '../../../shared/data/data/widgets';
import { ProjectCreatedComponent } from "../chart/project-created/project-created.component";
import { BudgetComponent } from "./budget/budget.component";
import { CategoriesSalesComponent } from "./categories-sales/categories-sales.component";
import { InvoicesComponent } from "./invoices/invoices.component";
import { MonthlySaleComponent } from "./monthly-sale/monthly-sale.component";
import { OrderOverviewComponent } from "./order-overview/order-overview.component";
import { TopChartComponent } from "./top-chart/top-chart.component";
import { CustomersComponent } from "./customers/customers.component";
import { RevenueComponent } from "./revenue/revenue.component";
import { OfferCarousleComponent } from "./offer-carousle/offer-carousle.component";
import { EarningExpenseComponent } from "./earning-expense/earning-expense.component";
import { ActiveTaskComponent } from "./active-task/active-task.component";
import { OnlineOfflineOrderComponent } from "./online-offline-order/online-offline-order.component";

@Component({
  selector: 'app-general',
  standalone: true,
  imports: [TopChartComponent, CategoriesSalesComponent, ProjectCreatedComponent,
    BudgetComponent, OrderOverviewComponent, MonthlySaleComponent,
    InvoicesComponent, CustomersComponent, RevenueComponent,
    OfferCarousleComponent, EarningExpenseComponent, ActiveTaskComponent, OnlineOfflineOrderComponent],
  templateUrl: './general.component.html',
  styleUrl: './general.component.scss'
})

export class GeneralComponent {

  public WebMobile = data.WebMobile;
  public nftWebsite = data.nftWebsite;
  public categoriesSales = data.categoriesSales;
  public totalEarning = data.totalEarning;
  public totalExpense = data.totalExpense;
  public online = data.online;
  public offline = data.offline;

}
