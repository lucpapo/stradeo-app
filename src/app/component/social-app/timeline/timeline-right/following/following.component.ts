import { Component } from '@angular/core';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import * as data from '../../../../../shared/data/data/social-media-data';

@Component({
    selector: 'app-following',
    templateUrl: './following.component.html',
    styleUrls: ['./following.component.scss'],
    standalone: true,
    imports: [NgbAccordionModule]
})
export class FollowingComponent {

  public followingData = data.Following;

}
