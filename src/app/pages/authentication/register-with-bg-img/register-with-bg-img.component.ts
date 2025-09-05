import { Component } from '@angular/core';
import { CommonRegisterFormComponent } from '../common-register-form/common-register-form.component';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-register-with-bg-img',
    templateUrl: './register-with-bg-img.component.html',
    styleUrls: ['./register-with-bg-img.component.scss'],
    standalone: true,
    imports: [RouterLink, CommonRegisterFormComponent]
})
export class RegisterWithBgImgComponent {

}
