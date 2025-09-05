import { Component } from '@angular/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-unique-dropdown',
    templateUrl: './unique-dropdown.component.html',
    styleUrls: ['./unique-dropdown.component.scss'],
    standalone: true,
    imports: [NgbDropdownModule]
})
export class UniqueDropdownComponent {

}
