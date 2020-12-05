import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';

import * as fromStudents from './students.reducer';
import * as StudentsActions from './students.actions';

@Injectable()
export class StudentsEffects {
  loadStudents$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StudentsActions.loadStudents),
      fetch({
        run: (action) => {
          // Your custom service 'load' logic goes here. For now just return a success action...
          return StudentsActions.loadStudentsSuccess({ students: [] });
        },

        onError: (action, error) => {
          console.error('Error', error);
          return StudentsActions.loadStudentsFailure({ error });
        },
      })
    )
  );

  constructor(private actions$: Actions) {}
}
