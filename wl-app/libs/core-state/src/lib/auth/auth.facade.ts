import { Injectable } from '@angular/core';

import { select, Store } from '@ngrx/store';
import { SecurityService } from '@wl/core-data';
import { of, combineLatest } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import * as fromAuth from './reducers';
import * as fromRoot from '../reducers';
@Injectable()
export class AuthFacade {
  private linksAll = [
    { path: '/home', icon: 'home', title: 'home' },
    { path: '/jobs', icon: 'view_list', title: 'jobs' },
    { path: '/heroes', icon: 'view_list', title: 'heroes' },
    { path: '/signin', icon: 'view_list', title: 'signin' },
    { path: '/books', icon: 'view_list', title: 'books' }
  ];

  showSidenav$ = this.store.pipe(select(fromRoot.getShowSidenav));
  loggedIn$ = this.store.pipe(select(fromAuth.getLoggedIn));
  links$ = of(this.linksAll);

  constructor(
    private store: Store<fromRoot.State & fromAuth.State>,
    private securityService: SecurityService
  ) {
    this.links$ = combineLatest([
      this.securityService.securityObject$,
      this.loggedIn$
    ]).pipe(
      switchMap(data =>
        of([
          ...(data[0].isAuthenticated
            ? [
                ...this.linksAll,
                { path: '/villains', icon: 'view_list', title: 'villains' },
                { path: '/students', icon: 'view_list', title: 'students' }
              ]
            : this.linksAll),
          data[1].valueOf()
            ? { path: '/logout', icon: 'view_list', title: 'logout' }
            : { path: '/login', icon: 'view_list', title: 'login' }
        ])
      )
    );
  }
}
