import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent {
  //constructor(http: HttpClient) {}
  private httpClient = inject(HttpClient);

  username = '';
  email = '';
  password = '';
  confirmPassword = '';

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

  onClickSignup() {
    this.httpClient
      .post('/api/1.0/users', {
        username: this.username,
        password: this.password,
        email: this.email,
      })
      .subscribe(() => {});

    // fetch('/api/1.0/users', {
    //   method: 'POST',
    //   body: JSON.stringify({
    //     username: this.username,
    //     password: this.password,
    //     email: this.email,
    //   }),
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    // });
  }
}
