import { Component } from '@angular/core';
import { ViewChild } from '@angular/core';
import { Router } from '@angular/router'

@Component({
  selector: 'wl-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  @ViewChild('sidenav') localSideNav;
  links = [
    { path: '/', icon: 'home', title: 'home' },
    { path: '/students', icon: 'view_list', title: 'students' },
  ];

  title = "Recruit";
  constructor(private router: Router) {}

  toggleSideNav(){
    this.localSideNav.toggle();
  }

  logout() {
    this.router.navigateByUrl('/login')
  }
}
