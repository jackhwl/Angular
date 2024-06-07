import { Injectable } from '@angular/core';
import { Observable, EMPTY, throwError, timer } from 'rxjs';


import { IUser } from '../user/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserRepositoryService {
  currentUser: IUser | null = null;

  constructor() { }

  saveUser(user: IUser): Observable<any> {
    const classes = user.classes || [];
    this.currentUser = { ...user, classes: [...classes] };

    return timer(1000);
  }

  enroll(classId: string): Observable<any> {
    if (!this.currentUser)
      return throwError(() => new Error('User not signed in'));

    if (this.currentUser.classes.includes(classId))
      return throwError(() => new Error('Already enrolled'));

    this.currentUser = { ...this.currentUser, classes: this.currentUser.classes.concat(classId)};

    return timer(1000);
  }

  drop(classId: string): Observable<any> {
    if (!this.currentUser)
      return throwError(() => new Error('User not signed in'));

    if (!this.currentUser.classes.includes(classId))
      return throwError(() => new Error('Not enrolled'));

    this.currentUser = { ...this.currentUser, classes: this.currentUser.classes.filter((c: string) => c !== classId)};

    return timer(1000);
  }

  signIn(credentials: any): Observable<any> {
    //Never, ever check credentials in client-side code.
    //This code is only here to supply a fake endpoint for signing in.
    if (credentials.email !== 'me@whitebeards.edu' || credentials.password !== 'super-secret')
      return throwError(() => new Error('Invalid login'));

    this.currentUser = {
      userId: 'e61aebed-dbc5-437a-b514-02b8380d8efc',
      firstName: 'Jim',
      lastName: 'Cooper',
      email: 'me@whitebeards.edu',
      classes: []
    };

    return EMPTY;
  }
}

