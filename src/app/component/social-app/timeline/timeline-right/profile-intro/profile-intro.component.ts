import { Component } from '@angular/core';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-profile-intro',
    templateUrl: './profile-intro.component.html',
    styleUrls: ['./profile-intro.component.scss'],
    standalone: true,
    imports: [NgbAccordionModule]
})
export class ProfileIntroComponent {

}
