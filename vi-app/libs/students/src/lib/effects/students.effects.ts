import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch, pessimisticUpdate } from '@nrwl/angular';
import { Student } from '../models/student';

import * as fromStudents from '../reducers/students.reducer';
import { StudentsActions, StudentsApiActions } from '../actions';
import { StudentService } from '../services';
import { switchMap, tap } from 'rxjs/operators';
import { ToastService } from '@vi/shared/common';

@Injectable()
export class StudentsEffects {
  notify$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          StudentsApiActions.notifyLoadStudentsSuccess,
          StudentsApiActions.notifyCreateStudentSuccess,
          StudentsApiActions.notifyUpdateStudentSuccess,
          StudentsApiActions.notifyDeleteStudentSuccess,
          StudentsApiActions.notifyUpdateStudentFailure
        ),
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
              StudentsApiActions.resetSelectedStudent(),
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

  createStudent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StudentsActions.createStudent),
      pessimisticUpdate({
        run: action =>
          this.studentService.create(action.student).pipe(
            switchMap((student: Student) => [
              StudentsApiActions.createStudentSuccess({ student }),
              StudentsApiActions.notifyCreateStudentSuccess({
                description: 'i18.students.student_created_successfully',
                title: 'POST',
                interpolateParams: {
                  name:
                    student.id +
                    ' ' +
                    student.firstName +
                    ' ' +
                    student.lastName
                }
              })
            ])
          ),
        onError: (action, error) => {
          console.error('Error', error);
          StudentsApiActions.updateStudentFailure({ error });
        }
      })
    )
  );

  updateStudent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StudentsActions.updateStudent),
      pessimisticUpdate({
        run: action =>
          this.studentService.update(action.student).pipe(
            switchMap(_ => [
              StudentsApiActions.updateStudentSuccess({
                student: action.student
              }),
              StudentsApiActions.notifyUpdateStudentSuccess({
                description: 'i18.students.student_updated_successfully',
                title: 'PUT',
                interpolateParams: {
                  name: action.student.firstName + ' ' + action.student.lastName
                }
              })
            ])
          ),
        onError: (action, error) => {
          console.error('Error', error);
          return StudentsApiActions.updateStudentFailure({ error });
        }
      })
    )
  );

  deleteStudent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StudentsActions.deleteStudent),
      pessimisticUpdate({
        run: action =>
          this.studentService.delete(action.student.id).pipe(
            switchMap(_ => [
              StudentsApiActions.deleteStudentSuccess({
                student: action.student
              }),
              StudentsApiActions.notifyDeleteStudentSuccess({
                description: 'i18.students.student_deleted_successfully',
                title: 'DELETE',
                interpolateParams: {
                  name: action.student.firstName + ' ' + action.student.lastName
                }
              })
            ])
          ),
        onError: (action, error) => {
          console.error('Error', error);
          StudentsApiActions.updateStudentFailure({ error });
        }
      })
    )
  );

  constructor(
    private actions$: Actions,
    private studentService: StudentService,
    private toastService: ToastService
  ) {}
}
