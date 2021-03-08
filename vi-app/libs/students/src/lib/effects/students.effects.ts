import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';
import { Student } from '../models/student';

import * as fromStudents from '../reducers/students.reducer';
import { StudentsActions, StudentsApiActions } from '../actions';
import { StudentService } from '../services';
import { map, switchMap, tap } from 'rxjs/operators';
import { ToastService } from '@vi/shared/common';

@Injectable()
export class StudentsEffects {
  notifyLoadJobsSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(StudentsApiActions.notifyLoadStudentsSuccess),
        tap(action => {
          this.toastService.open(
            action.description,
            action.title,
            action.interpolateParams
          );
        })
      ),
    { dispatch: false }
  );

  loadStudents$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StudentsActions.loadStudents),
      fetch({
        run: action =>
          this.studentService.all().pipe(
            switchMap((students: Student[]) => [
              StudentsApiActions.loadStudentsSuccess({ students }),
              StudentsApiActions.notifyLoadStudentsSuccess({
                description: 'i18.students.students_retrieved_successfully',
                title: 'GET',
                interpolateParams: { counter: students.length }
              })
            ])
          ),

        onError: (action, error) => {
          console.error('Error', error);
          return StudentsApiActions.loadStudentsFailure({ error });
        }
      })
    )
  );

  loadStudent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StudentsActions.loadStudent),
      fetch({
        run: action =>
          this.studentService
            .find(action.studentId)
            .pipe(
              switchMap((student: Student) => [
                StudentsApiActions.loadStudentSuccess({ student })
              ])
            ),
        onError: (action, error) =>
          StudentsApiActions.loadStudentFailure({ error })
      })
    )
  );

  constructor(
    private actions$: Actions,
    private studentService: StudentService,
    private toastService: ToastService
  ) {}
}
