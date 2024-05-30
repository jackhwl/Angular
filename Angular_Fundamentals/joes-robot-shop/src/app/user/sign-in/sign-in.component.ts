import { Component } from '@angular/core';
import { IUserCredentials } from '../user.model';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'bot-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {
  credentials: IUserCredentials = {email: '', password: ''}

  constructor(private userSvc: UserService, private router: Router){}

  signIn() {
    //console.log('sign-in called', this.credentials)
    this.router.navigate(['/catalog'])
    // this.userSvc.signIn(this.credentials).subscribe({
    //   next: () => this.router.navigate(['/catalog'])
    // })
  }
}
