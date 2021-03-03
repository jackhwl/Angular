import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { Conversation } from '../../shared/model';
import { mergeAll, pluck } from 'rxjs/operators';

@Component({
  templateUrl: './conversations.html',
  styleUrls: ['./conversations.css']
})
export class ConversationsCmp {
  folder: Observable<string>;
  conversations: Observable<Conversation[]>;

  constructor(route: ActivatedRoute) {
    this.folder = route.params.pipe(pluck('folder'));
    this.conversations = <any>route.data.pipe(
      pluck('conversations'),
      mergeAll()
    );
  }
}
