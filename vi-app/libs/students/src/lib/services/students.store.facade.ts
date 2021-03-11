import { Injectable } from '@angular/core';
import { Student } from '../models/student';

import { Action, ActionsSubject, select, Store } from '@ngrx/store';
import { BehaviorSubject, Subject } from 'rxjs';

import * as StudentsSelectors from '../reducers/students.selectors';

import { StudentsActions, StudentsApiActions } from '../actions';
import { filter } from 'rxjs/operators';

@Injectable()
export class StudentsStoreFacade {
  loaded$ = this.store.pipe(select(StudentsSelectors.getLoaded));
  allStudents$ = this.store.pipe(select(StudentsSelectors.getAllStudents));
  selectedStudent$ = this.store.pipe(select(StudentsSelectors.getSelected));
  error$ = this.store.pipe(select(StudentsSelectors.getError));

  mutations$ = this.actions$.pipe(
    filter(
      (action: Action) =>
        action.type ===
          StudentsApiActions.createStudentSuccess({} as any).type ||
        action.type ===
          StudentsApiActions.updateStudentSuccess({} as any).type ||
        action.type === StudentsApiActions.deleteStudentSuccess({} as any).type
    )
  );

  constructor(private store: Store<{}>, private actions$: ActionsSubject) {}

  getAll() {
    this.dispatch(StudentsActions.loadStudents());
  }

  selectStudent(selectedId: string) {
    this.dispatch(StudentsActions.selectStudent({ selectedId }));
  }

  loadStudents() {
    this.dispatch(StudentsActions.loadStudents());
  }

  // selectProject(projectId) {
  //   this.dispatch(new SelectProject(projectId));
  // }

  createStudent(student: Student) {
    this.dispatch(StudentsActions.createStudent({ student }));
  }

  updateStudent(student: Student) {
    this.dispatch(StudentsActions.updateStudent({ student }));
  }

  deleteStudent(student: Student) {
    this.dispatch(StudentsActions.deleteStudent({ student }));
  }

  dispatch(action: Action) {
    this.store.dispatch(action);
  }
}
