import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Quiz, Guess, QuizError } from '../models';

@Injectable()
export class QuizService {
  guesses: Guess[] = [];
  constructor(private http: HttpClient) { }

  getAllQuizzes(): (Observable<Quiz[] | QuizError>) { 
    return this.http.get<Quiz[]>('/api/quizzes')
      .pipe(
        catchError(this.handleHttpError)
      );
  }

  getAllQuizzesPromises(): Promise<Quiz[] | QuizError> { 
    return this.http.get<Quiz[]>('/api/quizzes')
    .pipe(
      catchError(this.handleHttpError)
    ).toPromise();
  }
  

  getScore(): Observable<any> {
    return this.http.post('/api/scores', this.guesses)
      .pipe(
        catchError(this.handleHttpError)
      );
  }

  private handleHttpError(error: HttpErrorResponse): Observable<QuizError> {
    let quizError = new QuizError();
    quizError.errorNumber = 400;
    quizError.message = error.statusText;
    quizError.friendlyMessage = 'An error occurred when retrieving data.';
    return throwError(quizError);
  }
}
