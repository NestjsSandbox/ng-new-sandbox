import { Injectable } from '@angular/core';
import {
  AbstractControl,
  AsyncValidator,
  ValidationErrors,
} from '@angular/forms';
import { UserService } from '../core/user.service';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UniqueEmailValidator implements AsyncValidator {
  constructor(private userService: UserService) {}

  // validate = (
  //   control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
  //   control.value; // control is the form-control of the email field
  //   return this.userService.isEmailTaken(control.value).pipe(
  //     map((_) => (_ ? { uniqueEmail: true } : null )),
  //     catchError(() => of(null)) // if the server is down, we don't want to block the user
  // )};

  validate(
    control: AbstractControl
  ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return this.userService.isEmailTaken(control.value).pipe(
      map((_) => (_ ? { uniqueEmail: true } : null)),
      catchError(() => of(null))
    );
  }
}
