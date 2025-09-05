import { Component } from '@angular/core';
import { DropdownComponent } from "../../../../shared/component/dropdown/dropdown.component";
import * as data from '../../../../shared/data/chart/dashboard';
import { NgApexchartsModule } from 'ng-apexcharts';

@Component({
  selector: 'app-sales-trend',
  standalone: true,
  imports: [DropdownComponent,NgApexchartsModule],
  templateUrl: './sales-trend.component.html',
  styleUrl: './sales-trend.component.scss'
})

export class SalesTrendComponent {

  public dropdownList: string[] = ['Weekly', 'Monthly', 'Yearly'];
  public chartData = data.salesTred ;
}
