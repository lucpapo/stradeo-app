import { Component } from '@angular/core';
import { NgbProgressbarModule } from '@ng-bootstrap/ng-bootstrap';
import { NgApexchartsModule } from 'ng-apexcharts';
import * as data from "../../../../shared/data/chart/dashboard";

@Component({
  selector: 'app-weekly-revenue-growth',
  standalone: true,
  imports: [NgbProgressbarModule, NgApexchartsModule],
  templateUrl: './weekly-revenue-growth.component.html',
  styleUrl: './weekly-revenue-growth.component.scss'
})

export class WeeklyRevenueGrowthComponent {

  public chartData = data.weeklyRevenueGrowth
}
