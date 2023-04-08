import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor() {}
  private httpClient = inject(HttpClient);

  signup(body: { username: string; password: string; email: string }) {
    return this.httpClient.post('/api/1.0/users', body);
  }
}
