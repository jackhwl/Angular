import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { State } from './reducers';

@Component({
  selector: 'app-root',
  template: `
    {{ fizzbuzzMessage | async }}
  `
})
export class AppComponent implements OnInit {
  fizzbuzzMessage: Observable<string> = this.store.pipe(
    select(state => state.fizzbuzz.message)
  );

  constructor(private store: Store<State>) {}

  ngOnInit() {
    setInterval(() => this.store.dispatch({ type: 'NEXT' }), 1000);
  }
}
