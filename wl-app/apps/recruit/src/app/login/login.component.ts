import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppUser, AppUserAuth } from '@wl/api-interfaces';
import { SecurityService } from '@wl/core-data';

@Component({
  selector: 'wl-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user: AppUser = new AppUser();
  securityObject$ = this.securityService.securityObject$;
  returnUrl: string;

  constructor(
    private securityService: SecurityService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.user.userName = 'jack';
    this.returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
  }

  // need replace with auth.effects.ts in https://ngrx.io/guide/effects
  login() {
    this.securityService.login(this.user).subscribe(
      resp => {
        console.log('resp=', resp);
        if (this.returnUrl) {
          this.router.navigateByUrl(this.returnUrl);
        }
      },
      () => {
        //this.securityObject$ = new AppUserAuth();
      }
    );
  }
}
