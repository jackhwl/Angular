import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AppUserAuth } from '@wl/api-interfaces';
import { SecurityService } from '@wl/core-data';
import { from, of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'wl-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild('sidenav') localSideNav;
  private linksAll = [
    { path: '/', icon: 'home', title: 'home' },
    { path: '/heroes', icon: 'view_list', title: 'heroes' },
    { path: '/villains', icon: 'view_list', title: 'villains', isAdmin: true },
    { path: '/students', icon: 'view_list', title: 'students', isAdmin: true },
    { path: '/login', icon: 'view_list', title: 'login' }
  ];
  links$ = of(this.linksAll);

  title = 'Recruit';
  constructor(
    private securityService: SecurityService,
    private router: Router,
    public translate: TranslateService
  ) {
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
  }

  toggleSideNav() {
    this.localSideNav.toggle();
  }

  logout() {
    this.router.navigateByUrl('/login');
  }

  useLang(lang) {
    this.translate.use(lang);
  }
}
