import { Component } from '@angular/core';
import * as data from '../../../../shared/data/data/dashboard';
import { DropdownComponent } from "../../../../shared/component/dropdown/dropdown.component";
@Component({
  selector: 'app-fresh-upgrade',
  standalone: true,
  imports: [DropdownComponent],
  templateUrl: './fresh-upgrade.component.html',
  styleUrl: './fresh-upgrade.component.scss'
})

export class FreshUpgradeComponent {

  public freshUpgrade = data.freshUpgrade;
  public dropdownList: string[] = ['Weekly', 'Monthly', 'Yearly'];
  
}
