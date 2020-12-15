import { Component, OnInit } from '@angular/core';
import { AppUser } from './app-user';
import { AppUserAuth } from './app-user-auth';
import { SecurityService } from './security.service';

@Component({
  selector: 'wl-login',
  templateUrl: './login.component.html'
})

export class LoginComponent implements OnInit {
  user: AppUser = new AppUser();
  securityObject: AppUserAuth = null;
  
  constructor(private securityService: SecurityService) { }

  ngOnInit(): void {
  }
  
  login() {
    this.securityService.login(this.user).subscribe(resp => {
        this.securityObject = resp;
    });
  }
}
