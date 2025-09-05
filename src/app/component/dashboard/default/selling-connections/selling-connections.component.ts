import { Component } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';
import * as data from "../../../../shared/data/chart/dashboard";
import { DropdownComponent } from "../../../../shared/component/dropdown/dropdown.component";

@Component({
  selector: 'app-selling-connections',
  standalone: true,
  imports: [DropdownComponent,NgApexchartsModule],
  templateUrl: './selling-connections.component.html',
  styleUrl: './selling-connections.component.scss'
})

export class SellingConnectionsComponent {

  public dropdownList: string[] = ['Weekly', 'Monthly', 'Yearly'];
   public chartData = data.sellingConnection;
}
