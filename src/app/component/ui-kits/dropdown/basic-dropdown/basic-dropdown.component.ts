import { Component } from '@angular/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import * as Data from '../../../../shared/data/data/ui-kits/dropdown';

@Component({
    selector: 'app-basic-dropdown',
    templateUrl: './basic-dropdown.component.html',
    styleUrls: ['./basic-dropdown.component.scss'],
    standalone: true,
    imports: [NgbDropdownModule]
})
export class BasicDropdownComponent {

  public basicDropdownData = Data.basicDropdown;

}
