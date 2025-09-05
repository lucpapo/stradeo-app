import { Component } from '@angular/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-dark-dropdown',
    templateUrl: './dark-dropdown.component.html',
    styleUrls: ['./dark-dropdown.component.scss'],
    standalone: true,
    imports: [NgbDropdownModule]
})

export class DarkDropdownComponent {

}
