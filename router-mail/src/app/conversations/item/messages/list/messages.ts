import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { Message } from '../../../../shared/model';
import { mergeAll, pluck } from 'rxjs/operators';

@Component({
  templateUrl: './messages.html',
  styleUrls: ['./messages.css']
})
export class MessagesCmp {
  messages: Observable<Message[]>;

  constructor(route: ActivatedRoute) {
    this.messages = <any>route.data.pipe(
      pluck('messages'),
      mergeAll()
    );
  }
}
