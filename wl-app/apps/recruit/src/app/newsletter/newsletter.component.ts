import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy
} from '@angular/core';
import { User } from '@wl/api-interfaces';

@Component({
  selector: 'wl-newsletter',
  templateUrl: './newsletter.component.html',
  styleUrls: ['./newsletter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsletterComponent {
  @Input() user: User;
  @Output() subscribe = new EventEmitter();

  subscribeToNewsletter(email: string) {
    this.subscribe.emit(email);
  }
}