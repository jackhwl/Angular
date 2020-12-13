import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'wl-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Input() links;
  @Output() toggled = new EventEmitter();
  @Output() logout = new EventEmitter();
  @Output() setLang = new EventEmitter();
}
