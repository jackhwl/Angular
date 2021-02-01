import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { getMessage, State } from './reducers';

@Component({
  selector: 'app-root',
  template: `
    {{ fizzbuzzMessage | async }}
  `
})
export class AppComponent {
  fizzbuzzMessage = this.store.pipe(select(getMessage));

  constructor(private store: Store<{}>) {}
}
