import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { Message } from '../../../../shared/model';
import { mergeAll, pluck } from 'rxjs/operators';

@Component({
  templateUrl: './message.html',
  styleUrls: ['./message.css']
})
export class MessageCmp {
  message: Observable<Message>;
  messages: Observable<Message[]>;

  constructor(route: ActivatedRoute) {
    this.messages = <any>route.data.pipe(
      pluck('messages'),
      mergeAll()
    );
    this.message = route.data.pipe(pluck('message'));
  }
}
