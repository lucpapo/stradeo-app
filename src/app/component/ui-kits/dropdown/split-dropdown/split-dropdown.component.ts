import { Component } from '@angular/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import * as Data from '../../../../shared/data/data/ui-kits/dropdown';

@Component({
    selector: 'app-split-dropdown',
    templateUrl: './split-dropdown.component.html',
    styleUrls: ['./split-dropdown.component.scss'],
    standalone: true,
    imports: [NgbDropdownModule]
})
export class SplitDropdownComponent {

  public splitDropdownData = Data.splitDropdown;

}
