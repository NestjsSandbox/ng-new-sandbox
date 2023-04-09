import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { UserService } from '../core/user.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent {
  //constructor(http: HttpClient) {}
  private userService = inject(UserService);

  signupForm = new FormGroup({
    username: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
  });
  apiProgress = false;
  signUpSuccess = false;
  
  onClickSignUp() {
    this.apiProgress = true;

    const body = this.signupForm.value as {
      username: string | null | undefined;
      password: string | null | undefined;
      email: string | null | undefined;
      confirmPassword: string | null | undefined;
    };
    delete body.confirmPassword;

    this.userService
    .signup( body )
      .subscribe(() => {
        this.signUpSuccess = true;
      });
    }//end of onClickSignUp()

    isDisabled(): boolean {
      return this.signupForm.get('password')?.value
        ? this.signupForm.get('password')?.value !== this.signupForm.get('confirmPassword')?.value
        : true;
    }//end of isDisabled()

  } //end of class

