import { Component } from '@angular/core';
import { userCard } from '../../..//shared/data/data/user/users-card';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-user-cards',
    templateUrl: './user-cards.component.html',
    styleUrls: ['./user-cards.component.scss'],
    standalone: true,
    imports: [RouterLink]
})
export class UserCardsComponent {

  public users = userCard;

}
