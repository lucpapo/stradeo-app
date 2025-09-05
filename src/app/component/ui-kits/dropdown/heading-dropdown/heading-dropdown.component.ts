import { Component } from '@angular/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-heading-dropdown',
    templateUrl: './heading-dropdown.component.html',
    styleUrls: ['./heading-dropdown.component.scss'],
    standalone: true,
    imports: [NgbDropdownModule]
})
export class HeadingDropdownComponent {

}
