import { Component } from '@angular/core';

import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FeatherIconComponent } from '../../../shared/component/header/feather-icon/feather-icon.component';

@Component({
    selector: 'app-common-login-form',
    templateUrl: './common-login-form.component.html',
    styleUrls: ['./common-login-form.component.scss'],
    standalone: true,
    imports: [FormsModule, RouterLink, FeatherIconComponent]
})
export class CommonLoginFormComponent {

  public show: boolean = false;

  showPassword() {
    this.show = !this.show;
  }

}
