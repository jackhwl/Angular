import { Injectable } from '@angular/core';
import { User } from '@wl/api-interfaces';
import { BehaviorSubject, Observable } from 'rxjs';

const ANONYMOUS_USER: User = {
  firstName: '',
  lastName: ''
};

@Injectable()
export class UserService {
  private subject = new BehaviorSubject<User>(ANONYMOUS_USER);

  user$: Observable<User> = this.subject.asObservable();

  loadUser(user: User) {
    this.subject.next(user);
  }
}
