import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Message } from '@wl/api-interfaces';
import { ViewChild } from '@angular/core';

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
  hello$ = this.http.get<Message>('/api/hello');
  title = "Recruit";
  constructor(private http: HttpClient) {}

  toggleSideNav(){
    this.localSideNav.toggle();
  }

  logout(){}
}
