import { Component, inject } from '@angular/core';
import { UserService } from '../core/user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { passwordMatchValidator } from './password-match.validator';
import { UniqueEmailValidator } from './unique-email.validator';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent {
  //constructor(http: HttpClient) {}
  private userService = inject(UserService);
  private uniqueEmailValidator = inject(UniqueEmailValidator);

  signupForm = new FormGroup(
    {
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
      email: new FormControl('', {
        validators: [Validators.required, Validators.email],
        asyncValidators: [
          this.uniqueEmailValidator.validate.bind(this.uniqueEmailValidator),
        ],
        updateOn: 'blur',
      }),
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
      } else if (field?.errors?.['email']) {
        return 'Email format is invalid';
      } else if (field?.errors?.['uniqueEmail']) {
        return 'Email is already in use';
      } else if (field?.errors?.['backendError']) {
        return field?.errors?.['backendError'];
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

  // This function is called when the user clicks the signup button
  onClickSignUp() {
    this.apiProgress = true;

    // Create an object with the values from the signup form
    const body = this.signupForm.value as {
      username: string | null | undefined;
      password: string | null | undefined;
      email: string | null | undefined;
      confirmPassword: string | null | undefined;
    };

    // Remove the "confirmPassword" property from the object
    delete body.confirmPassword;

    // Call the signup function in the UserService to send the signup request
    this.userService.signup(body).subscribe({
      // If the signup request was successful, set the signupSuccess property to true
      next: () => {
        this.signUpSuccess = true;
      },

      // If the signup request failed, display the error message in the email field
      error: (httpError: HttpErrorResponse) => {
        const emailValidationErrorMessage =
          httpError.error.validationErrors.email;

        this.signupForm
          .get('email')
          ?.setErrors({ backendError: emailValidationErrorMessage });

          this.apiProgress = false;
      },
    });
  } //end of onClickSignUp()

  // This function returns true if any of the fields are invalid
  isDisabled(): boolean {
    const formFilled =
      this.signupForm.get('username')?.value &&
      this.signupForm.get('email')?.value &&
      this.signupForm.get('password')?.value &&
      this.signupForm.get('confirmPassword')?.value;

    const validationError =
      this.usernameError ||
      this.emailError ||
      this.passwordError ||
      this.confirmPasswordError;

    return !formFilled || validationError ? true : false;

  }
 //end of isDisabled()
} //end of class
