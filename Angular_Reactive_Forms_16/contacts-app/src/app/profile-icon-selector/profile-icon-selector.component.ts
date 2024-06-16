import { Component } from '@angular/core';
import { profileIconNames } from './profile-icon-names';

@Component({
  selector: 'con-profile-icon-selector',
  templateUrl: './profile-icon-selector.component.html',
  styleUrls: ['./profile-icon-selector.component.css']
})
export class ProfileIconSelectorComponent {
  profileIcons = profileIconNames
  showAllIcons: boolean = true;
  selectedIcon!: string | null

  iconSelected(icon: string) {
    this.showAllIcons = false;
    this.selectedIcon = icon;
  }
}
