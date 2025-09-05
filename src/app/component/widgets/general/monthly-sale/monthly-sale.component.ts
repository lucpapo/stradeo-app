import { Component } from '@angular/core';
import * as data from '../../../../shared/data/chart/widgets'
import { NgApexchartsModule } from 'ng-apexcharts';

@Component({
  selector: 'app-monthly-sale',
  standalone: true,
  imports: [NgApexchartsModule],
  templateUrl: './monthly-sale.component.html',
  styleUrl: './monthly-sale.component.scss'
})

export class MonthlySaleComponent {

  public monthlyChart1 = data.monthlyChart1;

}
