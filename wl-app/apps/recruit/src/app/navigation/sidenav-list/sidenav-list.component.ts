import { Component, Input } from '@angular/core';

@Component({
  selector: 'wl-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.scss']
})
export class SidenavListComponent {
  @Input() links;
}
