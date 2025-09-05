import { Component } from '@angular/core';
import { CommonLoginFormComponent } from '../common-login-form/common-login-form.component';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-login-bg-img-two',
    templateUrl: './login-bg-img-two.component.html',
    styleUrls: ['./login-bg-img-two.component.scss'],
    standalone: true,
    imports: [RouterLink, CommonLoginFormComponent]
})
export class LoginBgImgTwoComponent {

}
