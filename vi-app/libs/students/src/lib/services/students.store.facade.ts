import { Injectable } from '@angular/core';
import { Student } from '../models/student';

import { select, Store } from '@ngrx/store';
import { BehaviorSubject, Subject } from 'rxjs';

import * as StudentsSelectors from '../reducers/students.selectors';

import { StudentsActions, StudentsApiActions } from '../actions';

@Injectable()
export class StudentsStoreFacade {
  allStudents$ = this.store.pipe(select(StudentsSelectors.getAllStudents));
  selectedStudent$ = this.store.pipe(select(StudentsSelectors.getSelected));

  private mutations = new Subject();
  mutations$ = this.mutations.asObservable();

  private loading = new BehaviorSubject<boolean>(true);
  loading$ = this.loading.asObservable();

  constructor(private store: Store<{}>) {}

  getAll() {
    this.store.dispatch(StudentsActions.loadStudents());
  }

  selectStudent(student: Student) {
    //this.selectedStudent.next(student);
  }

  loadStudents() {
    this.store.dispatch(StudentsActions.loadStudents());
  }

  // selectProject(projectId) {
  //   this.store.dispatch(new SelectProject(projectId));
  // }

  createStudent(student: Student) {
    //this.store.dispatch(new AddProject(project));
  }

  updateStudent(student: Student) {
    //this.store.dispatch(new UpdateProject(project));
  }

  deleteStudent(student: Student) {
    //this.store.dispatch(new DeleteProject(project));
  }
}
