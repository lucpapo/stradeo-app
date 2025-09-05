import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-unlock-user',
    templateUrl: './unlock-user.component.html',
    styleUrls: ['./unlock-user.component.scss'],
    standalone: true,
    imports: [RouterLink, FormsModule]
})

export class UnlockUserComponent {

  public show: boolean = false;

  showPassword() {
    this.show = !this.show;
  }

}
