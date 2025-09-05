import { Component } from '@angular/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-input-type-dropdown',
    templateUrl: './input-type-dropdown.component.html',
    styleUrls: ['./input-type-dropdown.component.scss'],
    standalone: true,
    imports: [NgbDropdownModule]
})
export class InputTypeDropdownComponent {

}
