import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor() {}
  private httpClient = inject(HttpClient);

  signup(body: {
    username: string | null | undefined;
    password: string | null | undefined;
    email: string | null | undefined;
  }) {
    return this.httpClient.post('http://localhost:8080/api/1.0/users', body);
  } //end signup

  // isEmailTaken(value: string) {
  //   return this.httpClient.post('/api/1.0/user/email', { email: value });
  // }//end

  isEmailTaken(value: string) {
    return this.httpClient.post('http://localhost:8080/api/1.0/user/email', {
      email: value,
    });
  }
} //end class
