import { Component } from '@angular/core';
import { NgbProgressbarModule } from '@ng-bootstrap/ng-bootstrap';
import { DropdownComponent } from "../../../../shared/component/dropdown/dropdown.component";

@Component({
  selector: 'app-order-overview',
  standalone: true,
  imports: [NgbProgressbarModule, DropdownComponent],
  templateUrl: './order-overview.component.html',
  styleUrl: './order-overview.component.scss'
})

export class OrderOverviewComponent {

  public dropdownList: string[] = ['Weekly', 'Monthly', 'Yearly'];

}
