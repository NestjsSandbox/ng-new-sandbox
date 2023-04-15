import { Component, inject } from '@angular/core';
import { UserService } from '../core/user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { passwordMatchValidator } from './password-match.validator';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent {
  //constructor(http: HttpClient) {}
  private userService = inject(UserService);

  signupForm = new FormGroup(
    {
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/),
      ]),
      confirmPassword: new FormControl(''),
    },
    {
      validators: passwordMatchValidator,
    }
  );
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

    this.userService.signup(body).subscribe(() => {
      this.signUpSuccess = true;
    });
  } //end of onClickSignUp()

  isDisabled(): boolean {
    return this.signupForm.get('password')?.value
      ? this.signupForm.get('password')?.value !==
          this.signupForm.get('confirmPassword')?.value
      : true;
  } //end of isDisabled()

  get usernameError(): string {
    const field = this.signupForm.get('username');
    if ((field?.errors && field?.touched) || field?.dirty) {
      if (field?.errors?.['required']) {
        return 'Username is required';
      }
      if (field?.errors?.['minlength']) {
        return 'Username must be at least 4 characters long';
      }
    }
    return '';
  } //end of get usernameError()

  get emailError(): string {
    const field = this.signupForm.get('email');
    if ((field?.errors && field?.touched) || field?.dirty) {
      if (field?.errors?.['required']) {
        return 'Email is required';
      }
      if (field?.errors?.['email']) {
        return 'Email format is invalid';
      }
    }
    return '';
  } //end of get emailError()

  get passwordError(): string {
    const field = this.signupForm.get('password');
    if ((field?.errors && field?.touched) || field?.dirty) {
      if (field?.errors?.['required']) {
        return 'Password is required';
      }
      if (field?.errors?.['pattern']) {
        return 'Password must have at leaset : 1 Uppercase, 1 lowercase and 1 number';
      }
    }
    return '';
  } //end of get passwordError()

  get confirmPasswordError(): string {
    //const field = this.signupForm.get('confirmPassword');
    if (
      (this.signupForm?.errors && this.signupForm?.touched) ||
      this.signupForm?.dirty
    ) {
      // if (field?.errors?.['required']) {
      //   return 'Password is required';
      // }
      if (this.signupForm?.errors?.['passwordMatch']) {
        return 'The confirm password value does not match the password';
      }
    }
    return '';
  } //end of get confirmPasswordError()
} //end of class
