import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { from, Observable, of } from 'rxjs';

import { AuthFacade, fromAuth, fromRoot } from '@wl/core-state';
import { LayoutActions, AuthActions } from '@wl/core-state';

@Component({
  selector: 'wl-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild('sidenav') localSideNav;
  links$ = of([]);
  isAuthenticated$: Observable<boolean>;
  showSidenav$: Observable<boolean>;
  loggedIn$: Observable<boolean>;

  title = 'Recruit';
  constructor(
    private authFacade: AuthFacade,
    private router: Router,
    public translate: TranslateService,
    private store: Store<fromRoot.State & fromAuth.State>
  ) {
    /**
     * Selectors can be applied with the `select` operator which passes the state
     * tree to the provided selector
     */
    this.loggedIn$ = this.authFacade.loggedIn$;
    this.links$ = this.authFacade.links$;
    this.showSidenav$ = this.authFacade.showSidenav$;

    translate.addLangs(['en', 'fr']);
    translate.setDefaultLang('en');

    const browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/en|fr/) ? browserLang : 'en');
  }

  ngOnInit(): void {}

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
