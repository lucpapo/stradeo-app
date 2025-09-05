import { Component } from '@angular/core';
import * as data from '../../../shared/data/data/user/users-card';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-friends',
    templateUrl: './friends.component.html',
    styleUrls: ['./friends.component.scss'],
    standalone: true,
    imports: [RouterLink]
})
export class FriendsComponent {

  public friendsData = data.userCard;

}
