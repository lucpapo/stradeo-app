import { Component } from '@angular/core';
import { CommonChartComponent } from "./common-chart/common-chart.component";
import * as data from "../../../shared/data/data/dashboard";
import * as ChartData from "../../../shared/data/chart/dashboard";
import { TotalRevenueComponent } from "./total-revenue/total-revenue.component";
import { TotalOrderComponent } from "./total-order/total-order.component";
import { TotalAppointmentComponent } from "./total-appointment/total-appointment.component";
import { UserByCountryComponent } from "./user-by-country/user-by-country.component";
import { OverAllRatingComponent } from "./over-all-rating/over-all-rating.component";
import { ProjectDeliveriesComponent } from "./project-deliveries/project-deliveries.component";
import { AuditLogComponent } from "./audit-log/audit-log.component";

@Component({
  selector: 'app-ecommerce',
  standalone: true,
  imports: [CommonChartComponent, TotalRevenueComponent, TotalOrderComponent,
    TotalAppointmentComponent, UserByCountryComponent, OverAllRatingComponent, 
    ProjectDeliveriesComponent, AuditLogComponent],
  templateUrl: './ecommerce.component.html',
  styleUrl: './ecommerce.component.scss'
})

export class EcommerceComponent {

  public totalSells = data.totalSells;
  public TotalSellsChart = ChartData.TotalSells;
  public dailyOrders = data.dailyOrders;
  public dailyOrdersChart = ChartData.dailyOrders;
  public ordersValue = data.ordersValue;
  public ordersValueChart = ChartData.ordersValue;
  public dailyRevenue = data.dailyRevenue;
  public dailyRevenueChart = ChartData.dailyRevenue;

}
