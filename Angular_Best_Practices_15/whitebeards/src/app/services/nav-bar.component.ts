import { Component } from '@angular/core';

import { UserRepositoryService } from "./user-repository.service";

@Component({
  selector: 'wb-nav-bar',
  styleUrls: [`./nav-bar.component.css`],
  template: `
    <div class="nav-bar">
      <img class="logo" src="/assets/images/whitebeard-logo.png" alt="Whitebeard Logo" />
      <div class="nav-item"><a [routerLink]="['/catalog']">Catalog</a></div>
      <account-menu [user]="currentUser" (signedOut)="handleSignOut()"></account-menu>
    </div>
`
})

export class NavBarComponent  {
  constructor(private userRepository:UserRepositoryService) {}

  get currentUser() {
    return this.userRepository.currentUser;
  }

  handleSignOut() {
    this.userRepository.currentUser = null;
  }
}
