import { Component } from '@angular/core';
import { DropdownComponent } from "../../../../shared/component/dropdown/dropdown.component";

@Component({
  selector: 'app-over-all-rating',
  standalone: true,
  imports: [DropdownComponent],
  templateUrl: './over-all-rating.component.html',
  styleUrl: './over-all-rating.component.scss'
})

export class OverAllRatingComponent {

  public dropdownList: string[] = ['Weekly', 'Monthly', 'Yearly'];

}
