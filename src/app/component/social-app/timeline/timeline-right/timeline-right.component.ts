import { Component } from '@angular/core';
import { FriendsProfileComponent } from './friends-profile/friends-profile.component';
import { LatestPhotosComponent } from './latest-photos/latest-photos.component';
import { FollowingComponent } from './following/following.component';
import { FollowersComponent } from './followers/followers.component';
import { ProfileIntroComponent } from './profile-intro/profile-intro.component';

@Component({
    selector: 'app-timeline-right',
    templateUrl: './timeline-right.component.html',
    styleUrls: ['./timeline-right.component.scss'],
    standalone: true,
    imports: [ProfileIntroComponent, FollowersComponent, FollowingComponent, LatestPhotosComponent, FriendsProfileComponent]
})
export class TimelineRightComponent {

}
