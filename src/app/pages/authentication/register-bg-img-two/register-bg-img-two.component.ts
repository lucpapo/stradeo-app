import { Component } from '@angular/core';
import { CommonRegisterFormComponent } from '../common-register-form/common-register-form.component';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-register-bg-img-two',
    templateUrl: './register-bg-img-two.component.html',
    styleUrls: ['./register-bg-img-two.component.scss'],
    standalone: true,
    imports: [RouterLink, CommonRegisterFormComponent]
})
export class RegisterBgImgTwoComponent {

}
