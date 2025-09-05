import { Component } from '@angular/core';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-my-profile',
    templateUrl: './my-profile.component.html',
    styleUrls: ['./my-profile.component.scss'],
    standalone: true,
    imports: [NgbAccordionModule]
})
export class MyProfileComponent {

  public isCollapsed = false;

}
