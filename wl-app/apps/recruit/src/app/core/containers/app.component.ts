import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AppUserAuth } from '@wl/api-interfaces';
import { SecurityService } from '@wl/core-data';
import { from, Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

import { fromAuth, fromRoot } from '@wl/core-state';
import { LayoutActions, AuthActions } from '@wl/core-state';

@Component({
  selector: 'wl-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild('sidenav') localSideNav;
  private linksAll = [
    { path: '/home', icon: 'home', title: 'home' },
    { path: '/jobs', icon: 'view_list', title: 'jobs' },
    { path: '/heroes', icon: 'view_list', title: 'heroes' },
    { path: '/villains', icon: 'view_list', title: 'villains', isAdmin: true },
    { path: '/students', icon: 'view_list', title: 'students', isAdmin: true },
    { path: '/signin', icon: 'view_list', title: 'signin' },
    { path: '/books', icon: 'view_list', title: 'books' },
    {
      path: '/login',
      icon: 'view_list',
      title: 'login',
      isAuthenticated: false
    },
    {
      path: '/logout',
      icon: 'view_list',
      title: 'logout',
      isAuthenticated: true
    }
  ];
  links$ = of(this.linksAll);
  isAuthenticated$: Observable<boolean>;
  showSidenav$: Observable<boolean>;
  loggedIn$: Observable<boolean>;

  title = 'Recruit';
  constructor(
    private securityService: SecurityService,
    private router: Router,
    public translate: TranslateService,
    private store: Store<fromRoot.State & fromAuth.State>
  ) {
    /**
     * Selectors can be applied with the `select` operator which passes the state
     * tree to the provided selector
     */
    this.showSidenav$ = this.store.pipe(select(fromRoot.getShowSidenav));
    this.loggedIn$ = this.store.pipe(select(fromAuth.getLoggedIn));

    translate.addLangs(['en', 'fr']);
    translate.setDefaultLang('en');

    const browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/en|fr/) ? browserLang : 'en');
  }

  ngOnInit(): void {
    this.securityService.securityObject$
      .pipe(
        tap(o => {
          this.links$ = of(
            o.isAuthenticated
              ? this.linksAll
              : this.linksAll.filter(l => !l.isAdmin)
          );
        })
      )
      .subscribe();

    // this.loggedIn$
    //   .pipe(
    //     tap(loggedIn => {
    //       this.links$ = of(
    //         loggedIn
    //           ? this.linksAll.filter(l => l.isAuthenticated)
    //           : this.linksAll.filter(l => !l.isAuthenticated)
    //       );
    //     })
    //   )
    //   .subscribe();
  }

  toggleSideNav() {
    this.localSideNav.toggle();
  }

  logoutJob() {
    this.router.navigateByUrl('/login');
  }

  useLang(lang) {
    this.translate.use(lang);
  }

  closeSidenav() {
    /**
     * All state updates are handled through dispatched actions in 'container'
     * components. This provides a clear, reproducible history of state
     * updates and user interaction through the life of our
     * application.
     */
    this.store.dispatch(LayoutActions.closeSidenav());
  }

  openSidenav() {
    this.store.dispatch(LayoutActions.openSidenav());
  }

  logout() {
    this.closeSidenav();

    this.store.dispatch(AuthActions.logoutConfirmation());
  }
}
