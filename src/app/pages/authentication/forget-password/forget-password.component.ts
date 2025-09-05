import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-forget-password',
    templateUrl: './forget-password.component.html',
    styleUrls: ['./forget-password.component.scss'],
    standalone: true,
    imports: [RouterLink, FormsModule]
})
export class ForgetPasswordComponent {

  public show: boolean = false;

  showPassword() {
    this.show = !this.show;
  }

}
