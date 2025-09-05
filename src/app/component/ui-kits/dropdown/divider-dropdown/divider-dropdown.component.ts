import { Component } from '@angular/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import * as Data from '../../../../shared/data/data/ui-kits/dropdown';

@Component({
    selector: 'app-divider-dropdown',
    templateUrl: './divider-dropdown.component.html',
    styleUrls: ['./divider-dropdown.component.scss'],
    standalone: true,
    imports: [NgbDropdownModule]
})
export class DividerDropdownComponent {

  public dividerDropdownData = Data.dividerDropdown;

}
