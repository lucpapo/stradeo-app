import { Component } from '@angular/core';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import * as data from '../../../../../shared/data/data/social-media-data';

@Component({
    selector: 'app-friends-profile',
    templateUrl: './friends-profile.component.html',
    styleUrls: ['./friends-profile.component.scss'],
    standalone: true,
    imports: [NgbAccordionModule]
})
export class FriendsProfileComponent {

  public friednsData = data.Friends;

}
