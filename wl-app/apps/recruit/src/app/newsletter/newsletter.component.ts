import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy
} from '@angular/core';
import { User } from '@wl/api-interfaces';
import { ToastService, UserService } from '@wl/core-data';
import { Observable } from 'rxjs';

@Component({
  selector: 'wl-newsletter',
  templateUrl: './newsletter.component.html',
  styleUrls: ['./newsletter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsletterComponent {
  //@Input() user$: Observable<User>;
  //@Output() subscribe = new EventEmitter();
  user$: Observable<User> = this.userService.user$;
  //firstName: string;

  constructor(
    private newsletterService: ToastService,
    private userService: UserService
  ) {}

  ngOnInit() {
    //this.userService.user$.subscribe(user => (this.firstName = user.firstName));
  }

  subscribeToNewsletter(email: string) {
    this.newsletterService.openSnackBar(email, 'GET');
  }
}
