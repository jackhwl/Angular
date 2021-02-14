import { Component, OnInit } from '@angular/core';

import { ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';

import { AuthFacade } from '@wl/core-state';

@Component({
  selector: 'wl-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild('sidenav') localSideNav;
  links$: Observable<any>;
  isAuthenticated$: Observable<boolean>;
  showSidenav$: Observable<boolean>;
  loggedIn$: Observable<boolean>;

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

  useLang(lang) {
    this.translate.use(lang);
  }

  closeSidenav() {
    this.authFacade.closeSidenav();
  }

  openSidenav() {
    this.authFacade.openSidenav();
  }

  logout() {
    this.authFacade.logout();
  }
}
