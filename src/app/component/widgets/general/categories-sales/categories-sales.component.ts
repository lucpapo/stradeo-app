import { Component } from '@angular/core';
import { DropdownComponent } from "../../../../shared/component/dropdown/dropdown.component";
import * as data from '../../../../shared/data/chart/widgets';
import { NgApexchartsModule } from 'ng-apexcharts';

@Component({
  selector: 'app-categories-sales',
  standalone: true,
  imports: [DropdownComponent,NgApexchartsModule],
  templateUrl: './categories-sales.component.html',
  styleUrl: './categories-sales.component.scss'
})

export class CategoriesSalesComponent {

  public dropdownList: string[] = ['Weekly', 'Monthly', 'Yearly'];
  public categoriesSales = data.categoriesSales;
  public totalEarned = data.totalEarned;

}
