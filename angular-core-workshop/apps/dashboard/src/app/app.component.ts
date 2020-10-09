import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  @ViewChild('sidenav') localSideNav;
  title = 'Angular Core Workshop';

  links = [
    { path: '/', icon: 'home', title: 'Home'},
    { path: '/customers', icon: 'face', title: 'Customers'},
    { path: '/projects', icon: 'work', title: 'Projects'}
  ]

  toggle() {
    this.localSideNav.toggle();
  }
}
