import { Component } from '@angular/core';
import { CommonLoginFormComponent } from '../common-login-form/common-login-form.component';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-login-with-tooltip',
    templateUrl: './login-with-tooltip.component.html',
    styleUrls: ['./login-with-tooltip.component.scss'],
    standalone: true,
    imports: [RouterLink, CommonLoginFormComponent]
})
export class LoginWithTooltipComponent {

}
