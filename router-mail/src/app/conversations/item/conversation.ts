import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';

import { Conversation } from '../../shared/model';

@Component({
  templateUrl: './conversation.html',
  styleUrls: ['./conversation.css']
})
export class ConversationCmp {
  conversation: Observable<Conversation>;

  constructor(private route: ActivatedRoute, private router: Router) {
    this.conversation = route.data.pipe(pluck('conversation'));
  }

  goUp(): void {
    const folder = this.route.snapshot.parent.params['folder'];
    this.router.navigate(['/', folder]);
  }
}
