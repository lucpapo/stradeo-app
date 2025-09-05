import { Component } from '@angular/core';
import { CommonLoginFormComponent } from '../common-login-form/common-login-form.component';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-login-with-bg-img',
    templateUrl: './login-with-bg-img.component.html',
    styleUrls: ['./login-with-bg-img.component.scss'],
    standalone: true,
    imports: [RouterLink, CommonLoginFormComponent]
})
export class LoginWithBgImgComponent {

}
