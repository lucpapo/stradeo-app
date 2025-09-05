import { Component } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';
import { DropdownComponent } from "../../../../shared/component/dropdown/dropdown.component";
import * as data from '../../../../shared/data/chart/dashboard';

@Component({
  selector: 'app-project-deliveries',
  standalone: true,
  imports: [NgApexchartsModule, DropdownComponent],
  templateUrl: './project-deliveries.component.html',
  styleUrl: './project-deliveries.component.scss'
})

export class ProjectDeliveriesComponent {

  public dropdownList: string[] = ['Weekly', 'Monthly', 'Yearly'];
  public chartData = data.projectDeliveries;
}
