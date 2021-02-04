import { Injectable } from '@angular/core';
import { Credentials, User } from '@wl/api-interfaces';
import { Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor() {}

  login({ username, password }: Credentials): Observable<User> {
    /**
     * Simulate a failed login to display the error
     * message for the login form.
     */
    if (username !== 'test' && username !== 'ngrx') {
      return throwError('Invalid username or password');
    }

    return of({ firstName: 'User', lastName: 'User' });
  }

  logout() {
    return of(true);
  }
}
