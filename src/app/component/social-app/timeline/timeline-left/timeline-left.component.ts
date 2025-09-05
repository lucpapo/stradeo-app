import { Component } from '@angular/core';
import { ActivityFeedComponent } from './activity-feed/activity-feed.component';
import { MutualFriendsComponent } from './mutual-friends/mutual-friends.component';
import { MyProfileComponent } from './my-profile/my-profile.component';

@Component({
    selector: 'app-timeline-left',
    templateUrl: './timeline-left.component.html',
    styleUrls: ['./timeline-left.component.scss'],
    standalone: true,
    imports: [MyProfileComponent, MutualFriendsComponent, ActivityFeedComponent]
})
export class TimelineLeftComponent {

}
