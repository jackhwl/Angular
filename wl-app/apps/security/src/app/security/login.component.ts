import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  returnUrl: string;

  constructor (private securityService: SecurityService, private route: ActivatedRoute, private router: Router) { }


  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
  }

  
  login() {
    this.securityService.login(this.user).subscribe(resp => {
        this.securityObject = resp;
        if (this.returnUrl) {
          this.router.navigateByUrl(this.returnUrl);
        }
    }, () => {
      this.securityObject = new AppUserAuth();
    });
  }
}
