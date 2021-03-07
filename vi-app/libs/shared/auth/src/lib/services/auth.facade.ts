import { Injectable } from '@angular/core';

import { select, Store } from '@ngrx/store';
//import { SecurityService } from '@wl/core-data';
import { of, combineLatest } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import * as fromAuth from '../reducers';
import * as fromRoot from '../reducers';

import { AuthActions } from '../actions';
import { Router } from '@angular/router';

@Injectable()
export class AuthFacade {
  private linksAll = [
    { path: '/home', icon: 'home', title: 'home' },
    { path: '/jobs', icon: 'view_list', title: 'jobs' },
    { path: '/heroes', icon: 'view_list', title: 'heroes' },
    { path: '/villains', icon: 'view_list', title: 'villains' },
    { path: '/students', icon: 'view_list', title: 'students' },
    { path: '/signin', icon: 'view_list', title: 'signin' },
    { path: '/books', icon: 'view_list', title: 'books' }
  ];

  //showSidenav$ = this.store.pipe(select(fromRoot.getShowSidenav));
  loggedIn$ = this.store.pipe(select(fromAuth.getLoggedIn));
  links$ = of(this.linksAll);

  constructor(
    private store: Store<fromRoot.State & fromAuth.State>,
    //private securityService: SecurityService,
    private router: Router
  ) {
    this.links$ = combineLatest([
      //this.securityService.securityObject$,
      this.loggedIn$
    ]).pipe(
      switchMap(data =>
        of([
          // ...(data[0].isAuthenticated
          //   ? [
          //       ...this.linksAll,
          //       { path: '/villains', icon: 'view_list', title: 'villains' },
          //       { path: '/students', icon: 'view_list', title: 'students' }
          //     ]
          //   : this.linksAll),
          ...(data[0].valueOf()
            ? [
                ...this.linksAll,
                {
                  path: '/logout',
                  icon: 'view_list',
                  title: 'logout',
                  click: 'logout'
                }
              ]
            : this.linksAll)
        ])
      )
    );
  }

  logout() {
    this.store.dispatch(AuthActions.logoutConfirmation());
  }

  isBookModule() {
    if (this.router.url.startsWith('/book')) return true;
    if (this.router.url === '/login') return true;

    return false;
  }
}
