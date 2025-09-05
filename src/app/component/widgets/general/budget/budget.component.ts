import { Component } from '@angular/core';
import { DropdownComponent } from "../../../../shared/component/dropdown/dropdown.component";
import * as data from '../../../../shared/data/data/widgets';
import * as chartData from '../../../../shared/data/chart/widgets';
import { CommonSvgIconsComponent } from "../../../../shared/component/header/common-svg-icons/common-svg-icons.component";
import { NgApexchartsModule } from 'ng-apexcharts';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-budget',
  standalone: true,
  imports: [DropdownComponent, CommonSvgIconsComponent,NgApexchartsModule,RouterModule],
  templateUrl: './budget.component.html',
  styleUrl: './budget.component.scss'
})

export class BudgetComponent {

  public dropdownList: string[] = ['Weekly', 'Monthly', 'Yearly'];
   public learningListItem  = data.learningListItem;
   public budgetChart  = chartData.budgetChart;
}
