import { Component } from '@angular/core';
import { User } from '@wl/api-interfaces';
import { ToastService } from '@wl/core-data';

@Component({
  selector: 'wl-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  user: User = {
    firstName: 'Alice',
    lastName: 'Smith'
  };

  constructor(private newsletterService: ToastService) {}

  subscribe(email: string) {
    this.newsletterService.openSnackBar(email, 'GET');
  }

  changeUserName() {
    this.user.firstName = 'Bob';
    // this.user = {
    //   firstName: 'Bob',
    //   lastName: 'Smith'
    // };
  }
}
