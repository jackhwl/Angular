import { Component } from '@angular/core';
import { User } from '@wl/api-interfaces';
import { StudentsService } from '@wl/core-data';

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

  constructor(private newsletterService: StudentsService) {}

  subscribe(email: string) {
    this.newsletterService.all().subscribe(_ => console.log(email));
  }

  changeUserName() {
    this.user.firstName = 'Bob';
  }
}
