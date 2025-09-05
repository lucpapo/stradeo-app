import { Component, Input } from '@angular/core';
import { addFriends } from '../../../../../shared/data/data/social-media-data';

@Component({
    selector: 'app-common-add-friends',
    templateUrl: './common-add-friends.component.html',
    styleUrls: ['./common-add-friends.component.scss'],
    standalone: true
})
export class CommonAddFriendsComponent {

  @Input() data: addFriends;

}
