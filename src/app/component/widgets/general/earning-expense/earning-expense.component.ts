import { Component, Input } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';

@Component({
  selector: 'app-earning-expense',
  standalone: true,
  imports: [NgApexchartsModule],
  templateUrl: './earning-expense.component.html',
  styleUrl: './earning-expense.component.scss'
})

export class EarningExpenseComponent {

  @Input() data : any

}
