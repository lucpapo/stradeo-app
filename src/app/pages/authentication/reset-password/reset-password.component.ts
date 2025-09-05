import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-reset-password',
    templateUrl: './reset-password.component.html',
    styleUrls: ['./reset-password.component.scss'],
    standalone: true,
    imports: [RouterLink, FormsModule]
})
export class ResetPasswordComponent {

  public show: boolean = false;

  showPassword() {
    this.show = !this.show;
  }

}
