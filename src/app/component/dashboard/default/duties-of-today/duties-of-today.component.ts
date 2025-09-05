import { Component } from '@angular/core';
import { DropdownComponent } from "../../../../shared/component/dropdown/dropdown.component";
import { theDutiesToday } from '../../../../shared/data/data/dashboard';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-duties-of-today',
  standalone: true,
  imports: [DropdownComponent,RouterModule],
  templateUrl: './duties-of-today.component.html',
  styleUrl: './duties-of-today.component.scss'
})

export class DutiesOfTodayComponent {

  public dropdownList: string[] = ['Weekly', 'Monthly', 'Yearly'];
  public theDutiesToday = theDutiesToday ;
}
