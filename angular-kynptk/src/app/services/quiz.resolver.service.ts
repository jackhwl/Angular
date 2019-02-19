import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, first } from 'rxjs/operators';
import { Quiz, QuizError } from '../models';
import { QuizService } from './quiz.service';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class QuizResolver implements Resolve<Quiz[] | QuizError> {
    constructor(private quizService: QuizService) {}
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Quiz[] | QuizError> {
        return this.quizService.getAllQuizzes()
            .pipe(
                first(),
                catchError(this.handleHttpError)
            );
    }
    
    private handleHttpError(error: HttpErrorResponse): Observable<QuizError> {
        let quizError = new QuizError();
        quizError.errorNumber = 400;
        quizError.message = error.statusText;
        quizError.friendlyMessage = 'An error occurred when resolve retrieving data.';
        return of(quizError);
    }
}