import { Component } from '@angular/core';
import * as data from "../../../../shared/data/data/dashboard";
import { CommonModule } from '@angular/common';
import { DropdownComponent } from "../../../../shared/component/dropdown/dropdown.component";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-clear-invoicing',
  standalone: true,
  imports: [CommonModule, DropdownComponent,RouterModule],
  templateUrl: './clear-invoicing.component.html',
  styleUrl: './clear-invoicing.component.scss'
})

export class ClearInvoicingComponent {

  public tableData = data.clearinvoicing;
  public dropdownList: string[] = ['Weekly', 'Monthly', 'Yearly'];

}
