import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';
import { Student } from '../models/student';

import * as fromStudents from '../reducers/students.reducer';
import { StudentsActions, StudentsApiActions } from '../actions';
import { StudentNgrxService } from '../services';
import { switchMap, tap } from 'rxjs/operators';
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
                description: 'i18.job.job_retrieved_successfully',
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

  constructor(
    private actions$: Actions,
    private studentService: StudentNgrxService,
    private toastService: ToastService
  ) {}
}
