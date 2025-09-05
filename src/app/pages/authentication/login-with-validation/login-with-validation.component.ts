import { Component } from '@angular/core';
import { CommonLoginFormComponent } from '../common-login-form/common-login-form.component';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-login-with-validation',
    templateUrl: './login-with-validation.component.html',
    styleUrls: ['./login-with-validation.component.scss'],
    standalone: true,
    imports: [RouterLink, CommonLoginFormComponent]
})
export class LoginWithValidationComponent {

}
