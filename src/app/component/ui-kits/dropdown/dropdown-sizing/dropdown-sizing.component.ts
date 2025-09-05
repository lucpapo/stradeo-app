import { Component } from '@angular/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import * as Data from '../../../../shared/data/data/ui-kits/dropdown';

@Component({
    selector: 'app-dropdown-sizing',
    templateUrl: './dropdown-sizing.component.html',
    styleUrls: ['./dropdown-sizing.component.scss'],
    standalone: true,
    imports: [NgbDropdownModule]
})
export class DropdownSizingComponent {

  public sizingDropdownData = Data.dropdownSizing;

}
