import { Routes } from '@angular/router';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { LoginBgImgTwoComponent } from './login-bg-img-two/login-bg-img-two.component';
import { LoginWithBgImgComponent } from './login-with-bg-img/login-with-bg-img.component';
import { LoginWithSweetAlertComponent } from './login-with-sweet-alert/login-with-sweet-alert.component';
import { LoginWithTooltipComponent } from './login-with-tooltip/login-with-tooltip.component';
import { LoginWithValidationComponent } from './login-with-validation/login-with-validation.component';
import { MaintenanceComponent } from './maintenance/maintenance.component';
import { RegisterBgImgTwoComponent } from './register-bg-img-two/register-bg-img-two.component';
import { RegisterSimpleComponent } from './register-simple/register-simple.component';
import { RegisterWithBgImgComponent } from './register-with-bg-img/register-with-bg-img.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { SimpleLoginComponent } from './simple-login/simple-login.component';
import { UnlockUserComponent } from './unlock-user/unlock-user.component';

export default [
  {
    path: 'login-simple',
    component: SimpleLoginComponent,
  },
  {
    path: 'login-bg-image',
    component: LoginWithBgImgComponent,
  },
  {
    path: 'login-image-two',
    component: LoginBgImgTwoComponent,
  },
  {
    path: 'login-validation',
    component: LoginWithValidationComponent,
  },
  {
    path: 'login-tooltip',
    component: LoginWithTooltipComponent,
  },
  {
    path: 'login-sweetalert',
    component: LoginWithSweetAlertComponent,
  },
  {
    path: 'register-simple',
    component: RegisterSimpleComponent,
  },
  {
    path: 'register-image',
    component: RegisterWithBgImgComponent,
  },
  {
    path: 'register-image-two',
    component: RegisterBgImgTwoComponent,
  },
  {
    path: 'unlock-user',
    component: UnlockUserComponent,
  },
  {
    path: 'forget-password',
    component: ForgetPasswordComponent,
  },
  {
    path: 'reset-password',
    component: ResetPasswordComponent,
  },
  {
    path: 'maintenance',
    component: MaintenanceComponent,
  },
] as Routes; 