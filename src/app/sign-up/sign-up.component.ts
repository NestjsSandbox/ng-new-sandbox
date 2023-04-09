import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { UserService } from '../core/user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent {
  //constructor(http: HttpClient) {}
  private userService = inject(UserService);

  username = '';
  email = '';
  password = '';
  confirmPassword = '';
  apiProgress = false;
  signUpSuccess = false;



  isDisabled() {
    return this.password ? this.password !== this.confirmPassword : true;
  }

  onClickSignUp() {
    this.apiProgress = true;
    this.userService
      .signup({
        username: this.username,
        password: this.password,
        email: this.email,
      })
      .subscribe(() => {
        this.signUpSuccess = true;
      });
  }
}
