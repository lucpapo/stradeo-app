import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { FeatherIconComponent } from '../../shared/component/header/feather-icon/feather-icon.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [RouterLink, FormsModule, ReactiveFormsModule, FeatherIconComponent]
})

export class LoginComponent {

  public show: boolean = false;
  public loginForm: FormGroup;

  constructor(private fb: FormBuilder, public router: Router) {

    const userData = localStorage.getItem('user');
    if (userData?.length != null) {
      router.navigate(['/dashboard/default'])
    }

    this.loginForm = this.fb.group({
      email: ["Test@gmail.com", [Validators.required, Validators.email]],
      password: ["test123", Validators.required],
    });
  }

  showPassword() {
    this.show = !this.show;
  }

  login() {
    if (this.loginForm.valid) {
      if (this.loginForm.value["email"] == "Test@gmail.com" && this.loginForm.value["password"] == "test123") {
        let user = {
          email: "Test@gmail.com",
          password: "test123",
          name: "test user",
        };
        localStorage.setItem("user", JSON.stringify(user));
        this.router.navigate(["/dashboard/default"]);
      }
    }
  }
}
