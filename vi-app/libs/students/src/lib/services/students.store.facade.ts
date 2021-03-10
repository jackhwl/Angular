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

  mutations$ = this.actions$.pipe(
    filter(
      (action: Action) =>
        action.type ===
          StudentsApiActions.notifyCreateStudentSuccess({} as any).type ||
        action.type ===
          StudentsApiActions.notifyUpdateStudentSuccess({} as any).type ||
        action.type === StudentsActions.deleteStudent({} as any).type
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
  //   this.store.dispatch(new SelectProject(projectId));
  // }

  createStudent(student: Student) {
    this.store.dispatch(StudentsActions.createStudent({ student }));
  }

  updateStudent(student: Student) {
    this.store.dispatch(StudentsActions.updateStudent({ student }));
  }

  deleteStudent(student: Student) {
    //this.store.dispatch(new DeleteProject(project));
  }

  dispatch(action: Action) {
    this.store.dispatch(action);
  }
}
