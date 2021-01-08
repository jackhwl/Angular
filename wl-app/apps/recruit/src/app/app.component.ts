import { Component } from '@angular/core';
import { ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'wl-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild('sidenav') localSideNav;
  links = [
    { path: '/', icon: 'home', title: 'home' },
    { path: '/home', icon: 'view_list', title: 'header_link_one' },
    { path: '/villains', icon: 'view_list', title: 'villains' },
    { path: '/students', icon: 'view_list', title: 'students' }
  ];

  title = 'Recruit';
  constructor(private router: Router, public translate: TranslateService) {
    translate.addLangs(['en', 'fr']);
    translate.setDefaultLang('en');

    const browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/en|fr/) ? browserLang : 'en');
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
