import { Routes } from '@angular/router';
import { UserCardsComponent } from './user-cards/user-cards.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

export default [
  {
    path: 'users-profile',
    component: UserProfileComponent,
    data: {
      title: "User Profile",
      breadcrumb: "User Profile",
    }
  },
  {
    path: 'edit-profile',
    component: UserEditComponent,
    data: {
      title: "Edit Profile",
      breadcrumb: "Edit Profile",
    }
  },
  {
    path: 'users-cards',
    component: UserCardsComponent,
    data: {
      title: "User Cards",
      breadcrumb: "User Cards",
    }
  },
] as Routes; 
