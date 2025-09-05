import { Component } from '@angular/core';
import { NgbDropdown, NgbDropdownToggle, NgbDropdownMenu, NgbDropdownItem } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-vertical',
    templateUrl: './vertical.component.html',
    styleUrls: ['./vertical.component.scss'],
    standalone: true,
    imports: [NgbDropdown, NgbDropdownToggle, NgbDropdownMenu, NgbDropdownItem]
})
export class VerticalComponent {

}
