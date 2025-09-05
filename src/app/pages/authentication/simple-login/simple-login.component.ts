import { Component } from '@angular/core';
import { CommonLoginFormComponent } from '../common-login-form/common-login-form.component';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-simple-login',
    templateUrl: './simple-login.component.html',
    styleUrls: ['./simple-login.component.scss'],
    standalone: true,
    imports: [RouterLink, CommonLoginFormComponent]
})
export class SimpleLoginComponent {

}
