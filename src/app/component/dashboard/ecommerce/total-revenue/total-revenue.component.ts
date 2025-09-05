import { Component } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';
import * as data from '../../../../shared/data/chart/dashboard';
@Component({
  selector: 'app-total-revenue',
  standalone: true,
  imports: [NgApexchartsModule],
  templateUrl: './total-revenue.component.html',
  styleUrl: './total-revenue.component.scss'
})

export class TotalRevenueComponent {

  public chartData = data.revenueChar;
  public monthlayChart = data.monthlayChart;

} 
