import { Component } from '@angular/core';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import * as data from '../../../../../shared/data/data/social-media-data';

@Component({
    selector: 'app-followers',
    templateUrl: './followers.component.html',
    styleUrls: ['./followers.component.scss'],
    standalone: true,
    imports: [NgbAccordionModule]
})
export class FollowersComponent {

  public followersData = data.Followers;

}
