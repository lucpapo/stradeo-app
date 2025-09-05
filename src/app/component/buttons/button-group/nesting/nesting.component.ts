import { Component } from '@angular/core';
import { NgbDropdown, NgbDropdownToggle, NgbDropdownMenu, NgbDropdownItem } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-nesting',
    templateUrl: './nesting.component.html',
    styleUrls: ['./nesting.component.scss'],
    standalone: true,
    imports: [NgbDropdown, NgbDropdownToggle, NgbDropdownMenu, NgbDropdownItem]
})
export class NestingComponent {

}
