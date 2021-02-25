import { EventEmitter, Output } from '@angular/core';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'vi-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.scss']
})
export class SidenavListComponent {
  @Input() links;
  @Input() currentLang;
  @Output() logout = new EventEmitter();
  @Output() useLang = new EventEmitter();
}
