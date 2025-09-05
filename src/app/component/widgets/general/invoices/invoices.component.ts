import { Component } from '@angular/core';
import { DropdownComponent } from "../../../../shared/component/dropdown/dropdown.component";
import { NgApexchartsModule } from 'ng-apexcharts';
import * as chartData from '../../../../shared/data/chart/widgets';

@Component({
  selector: 'app-invoices',
  standalone: true,
  imports: [DropdownComponent,NgApexchartsModule],
  templateUrl: './invoices.component.html',
  styleUrl: './invoices.component.scss'
})

export class InvoicesComponent {

  public dropdownList: string[] = ['Weekly', 'Monthly', 'Yearly'];
   public invoices = chartData.invoices ;
} 
