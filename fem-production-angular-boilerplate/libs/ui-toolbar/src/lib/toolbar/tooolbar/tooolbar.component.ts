import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'fem-tooolbar',
  templateUrl: './tooolbar.component.html',
  styleUrls: ['./tooolbar.component.scss']
})
export class TooolbarComponent {
  @Output() logout = new EventEmitter();
  @Output() toggleSideNav = new EventEmitter();
}
