import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'vi-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Input() links;
  @Input() currentLang;
  @Output() toggled = new EventEmitter();
  @Output() logout = new EventEmitter();
  @Output() useLang = new EventEmitter();

  data(data: string) {
    if (data == 'logout') this.logout.emit();
  }
}
