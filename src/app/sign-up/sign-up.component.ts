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

  onChangeUsername(event: Event) {
    this.username = (event.target as HTMLInputElement).value;
  }
  onChangeEmail(event: Event) {
    this.email = (event.target as HTMLInputElement).value;
  }
  onChangePassword(event: Event) {
    this.password = (event.target as HTMLInputElement).value;
  }

  onChangeConfirmPassword(event: Event) {
    this.confirmPassword = (event.target as HTMLInputElement).value;
  }

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
