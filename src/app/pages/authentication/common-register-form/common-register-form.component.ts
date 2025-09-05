import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FeatherIconComponent } from '../../../shared/component/header/feather-icon/feather-icon.component';

@Component({
    selector: 'app-common-register-form',
    templateUrl: './common-register-form.component.html',
    styleUrls: ['./common-register-form.component.scss'],
    standalone: true,
    imports: [FormsModule, FeatherIconComponent, RouterLink]
})
export class CommonRegisterFormComponent {

  public show: boolean = false;

  showPassword() {
    this.show = !this.show;
  }

}
