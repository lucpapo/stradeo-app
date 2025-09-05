import { Component } from '@angular/core';
import * as data from '../../../../shared/data/data/social-media-data';
import { ActivityLogComponent } from './activity-log/activity-log.component';
import { HobbiesEductionComponent } from './hobbies-eduction/hobbies-eduction.component';
import { CommonAddFriendsComponent } from './common-add-friends/common-add-friends.component';
import { FeatherIconComponent } from '../../../../shared/component/header/feather-icon/feather-icon.component';

@Component({
    selector: 'app-about-center',
    templateUrl: './about-center.component.html',
    styleUrls: ['./about-center.component.scss'],
    standalone: true,
    imports: [CommonAddFriendsComponent, FeatherIconComponent, HobbiesEductionComponent, ActivityLogComponent]
})
export class AboutCenterComponent {

  public addFriendsData = data.peopleKnowYouData;
  public hobbiesAndInterestData = data.hobbiesAndInterestData;
  public eductionData = data.eductionData;

}
