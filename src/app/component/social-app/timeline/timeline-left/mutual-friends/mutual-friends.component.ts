import { Component } from '@angular/core';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import * as data from '../../../../../shared/data/data/social-media-data';

@Component({
    selector: 'app-mutual-friends',
    templateUrl: './mutual-friends.component.html',
    styleUrls: ['./mutual-friends.component.scss'],
    standalone: true,
    imports: [NgbAccordionModule]
})
export class MutualFriendsComponent {

  public isCollapsed = false;
  public mautalFriendsData = data.mutualFriendsData;

}
