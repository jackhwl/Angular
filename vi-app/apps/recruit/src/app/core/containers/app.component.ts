import { Component } from '@angular/core';

import { ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';

import { AuthFacade } from '@vi/shared/auth';

@Component({
  selector: 'vi-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild('sidenav') localSideNav;
  isAuthenticated$: Observable<boolean>;
  showSidenav$: Observable<boolean>;
  loggedIn$: Observable<boolean>;
  links$: Observable<any>;

  title = 'Recruit';
  constructor(
    private authFacade: AuthFacade,
    public translate: TranslateService
  ) {
    /**
     * Selectors can be applied with the `select` operator which passes the state
     * tree to the provided selector
     */
    this.loggedIn$ = this.authFacade.loggedIn$;
    this.links$ = this.authFacade.links$;
    //this.showSidenav$ = this.authFacade.showSidenav$;

    translate.addLangs(['en', 'fr']);
    translate.setDefaultLang('en');

    const browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/en|fr/) ? browserLang : 'en');
  }

  toggleSideNav() {
    this.localSideNav.toggle();
  }

  useLang(lang) {
    this.translate.use(lang);
  }

  closeSidenav() {
    //this.authFacade.closeSidenav();
  }

  openSidenav() {
    //this.authFacade.openSidenav();
  }

  logout() {
    this.authFacade.logout();
  }

  isBookModule() {
    return this.authFacade.isBookModule();
  }
}
