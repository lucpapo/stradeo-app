import { Component } from '@angular/core';
import { DropdownComponent } from "../../../../shared/component/dropdown/dropdown.component";
import * as data from '../../../../shared/data/data/dashboard';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-total-order',
  standalone: true,
  imports: [DropdownComponent,CommonModule,RouterModule],
  templateUrl: './total-order.component.html',
  styleUrl: './total-order.component.scss'
})

export class TotalOrderComponent {

  public dropdownList: string[] = ['Weekly', 'Monthly', 'Yearly'];
  public data = data.totalOrder;
}
