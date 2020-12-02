import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'wl-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Output() toggled = new EventEmitter();
}
