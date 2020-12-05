import { Injectable } from '@angular/core';

import { select, Store, Action } from '@ngrx/store';

import * as fromStudents from './students.reducer';
import * as StudentsSelectors from './students.selectors';

@Injectable()
export class StudentsFacade {
  loaded$ = this.store.pipe(select(StudentsSelectors.getStudentsLoaded));
  allStudents$ = this.store.pipe(select(StudentsSelectors.getAllStudents));
  selectedStudents$ = this.store.pipe(select(StudentsSelectors.getSelected));

  constructor(private store: Store<fromStudents.StudentsPartialState>) {}

  dispatch(action: Action) {
    this.store.dispatch(action);
  }
}
