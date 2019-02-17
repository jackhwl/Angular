import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';
import { questions, options } from '../data';

@Injectable()
export class FakeApiInterceptor implements HttpInterceptor {

    constructor() { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        // wrap in delayed observable to simulate server api call
        return of(null).pipe(mergeMap(() => {

            // get questions
            if (request.url.endsWith('/questions') && request.method === 'GET') {
                return of(new HttpResponse({ status: 200, body: questions }));
            }

            // get options
            if (request.url.endsWith('/options') && request.method === 'GET') {
                return of(new HttpResponse({ status: 200, body: options }));
            }

            // get quizzes
            if (request.url.endsWith('/quizzes') && request.method === 'GET') {
                const quizzes = questions.map(q=>({
                    questionId: q.id,
                    question: q.value,
                    options: options.filter(option=>option.questionId === q.id)
                                .map(o=>o.value)
                  }));
    
                return of(new HttpResponse({ status: 200, body: quizzes }));
            }

            // get quizzes
            // pass through any requests not handled above
            return next.handle(request);
            
        }))

        // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
        .pipe(materialize())
        .pipe(delay(500))
        .pipe(dematerialize());
    }
}

export let FakeApiProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: FakeApiInterceptor,
    multi: true
};