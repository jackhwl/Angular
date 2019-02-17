import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, filter , flatMap,mergeMap, tap, first, zip} from 'rxjs/operators';
import { questions, options } from '../data';
import { Quiz, Guess, Question, Option, QuizError } from "../models";

@Injectable()
export class QuizService {

  constructor(private http: HttpClient) { }

  getAllQuestions(): (Observable<Question[] | QuizError>) { 
    return this.http.get<Question[]>('/api/questions')
      .pipe(
        catchError(this.handleHttpError)
      );
  }

  getAllOptions(): (Observable<Option[] | QuizError>) { 
    return this.http.get<Option[]>('/api/options')
      .pipe(
        catchError(this.handleHttpError)
      );
  }

  getAllQuizzes1(): (Observable<Quiz[] | QuizError>) { 
    return this.http.get<Quiz[]>('/api/quizzes')
      .pipe(
        catchError(this.handleHttpError)
      );
  }

  getAllQuizzes0(): (Observable<any>) {
    const questions$ = this.getAllQuestions();
    const options$ = this.getAllOptions();
    const toption$ = options$
    .pipe(
      map(opa=>opa.map(optio=>optio)
        .filter(option=>option.questionId === 22)
                            .map(o=>o.value)));
   
    zip(questions$, options$)
    const quizzes$ = questions$
    .pipe(
      //first(),
    map(qa=>qa.map(q=>({
      questionId: q.id,
      question: q.value,
      m:5,
      options: options$
      .pipe(
        map(opa=>opa.map(optio=>optio)
          .filter(option=>option.questionId === q.id)
                              .map(o=>o.value)))
     
  
      
     }))
    ));
    //return quizzes$;

    return toption$;
  }

  getAllQuizzes(): (Observable<Quiz[]>) { // | QuizError
    const quizzes:Quiz[] = questions.map(q=>({
      questionId: q.id,
      question: q.value,
      options: options.filter(option=>option.questionId === q.id)
                  .map(o=>o.value)
    }));
    return of(quizzes);
      // .pipe(
      //   catchError(err => this.handleHttpError(err))
      // );
  }

  getScore(guesses: Guess[]): Observable<number> {
    let score: number = 0;
    const answers = this.getAllAnswers();

    guesses.forEach(guess => {
      score += this.foundAnswer(answers, guess) ? 1 : 0;
    });

    return of(score);
  }

  private handleHttpError(error: HttpErrorResponse): Observable<QuizError> {
    let quizError = new QuizError();
    quizError.errorNumber = 100;
    quizError.message = error.statusText;
    quizError.friendlyMessage = 'An error occurred retrieving data.';
    return throwError(quizError);
  }

  private getAllAnswers(): Guess[] {
    return options.filter(option => option.answer)
                  .map(o => ({
                    questionId: o.questionId,
                    answer: o.value
                  }));
  }

  private foundAnswer(answers: Guess[], guess: Guess): boolean {
    return answers.filter(answer => answer.questionId === guess.questionId 
              && answer.answer === guess.answer).length > 0;
  }
}
