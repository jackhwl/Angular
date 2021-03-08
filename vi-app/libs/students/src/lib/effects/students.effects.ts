import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';
import { Student } from '../models/student';

import * as fromStudents from '../reducers/students.reducer';
import { StudentsActions, StudentsApiActions } from '../actions';
import { StudentNgrxService } from '../services';
import { switchMap } from 'rxjs/operators';

@Injectable()
export class StudentsEffects {
  loadStudents$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StudentsActions.loadStudents),
      fetch({
        run: action =>
          this.studentService
            .all()
            .pipe(
              switchMap((students: Student[]) => [
                StudentsApiActions.loadStudentsSuccess({ students })
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
    private studentService: StudentNgrxService
  ) {}
}
