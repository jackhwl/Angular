import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { LayoutActions } from '../actions';

@Injectable()
export class CoreFacade {
  //showSidenav$ = this.store.pipe(select(fromRoot.getShowSidenav));
  //loggedIn$ = this.store.pipe(select(fromAuth.getLoggedIn));

  constructor(private store: Store<{}>) {}

  closeSidenav() {
    /**
     * All state updates are handled through dispatched actions in 'container'
     * components. This provides a clear, reproducible history of state
     * updates and user interaction through the life of our
     * application.
     */
    this.store.dispatch(LayoutActions.closeSidenav());
  }

  openSidenav() {
    this.store.dispatch(LayoutActions.openSidenav());
  }
}
