import { Component } from '@angular/core';
import { CommonRegisterFormComponent } from '../common-register-form/common-register-form.component';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-register-simple',
    templateUrl: './register-simple.component.html',
    styleUrls: ['./register-simple.component.scss'],
    standalone: true,
    imports: [RouterLink, CommonRegisterFormComponent]
})
export class RegisterSimpleComponent {

}
