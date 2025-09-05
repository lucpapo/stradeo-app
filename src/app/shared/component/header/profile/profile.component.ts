import { Component } from '@angular/core';
import { FeatherIconComponent } from "../feather-icon/feather-icon.component";
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [FeatherIconComponent,RouterModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})

export class ProfileComponent {

  constructor(private router: Router) { }

  logOut() {
    localStorage.clear();
    this.router.navigate(['/auth/login'])
  }

}
