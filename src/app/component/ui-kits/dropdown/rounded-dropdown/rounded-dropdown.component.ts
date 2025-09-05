import { Component } from '@angular/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import * as Data from '../../../../shared/data/data/ui-kits/dropdown';

@Component({
    selector: 'app-rounded-dropdown',
    templateUrl: './rounded-dropdown.component.html',
    styleUrls: ['./rounded-dropdown.component.scss'],
    standalone: true,
    imports: [NgbDropdownModule]
})
export class RoundedDropdownComponent {

  public roundedDropdownData = Data.roundedDropdown;

}
