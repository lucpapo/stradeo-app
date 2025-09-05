import { Component } from '@angular/core';
import { CommonLoginFormComponent } from '../common-login-form/common-login-form.component';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-login-with-sweet-alert',
    templateUrl: './login-with-sweet-alert.component.html',
    styleUrls: ['./login-with-sweet-alert.component.scss'],
    standalone: true,
    imports: [RouterLink, CommonLoginFormComponent]
})
export class LoginWithSweetAlertComponent {

}
