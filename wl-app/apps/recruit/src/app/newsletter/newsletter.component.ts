import { Component, Input, Output, EventEmitter } from '@angular/core';
import { User } from '@wl/api-interfaces';

@Component({
  selector: 'wl-newsletter',
  templateUrl: './newsletter.component.html',
  styleUrls: ['./newsletter.component.scss']
})
export class NewsletterComponent {
  @Input()
  user: User;

  @Output()
  subscribe = new EventEmitter();

  subscribeToNewsletter(email: string) {
    this.subscribe.emit(email);
  }
}
