import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';

import { QuizService } from './quiz.service';
import { Quiz, QuizError } from '../models';

describe('QuizService Tests', () => {
    let quizService: QuizService;
    let httpTestingController: HttpTestingController;

    let testQuizzess: Quiz[] = [
        { questionId: 1, question: 'question one', options:['aaa','bbb','ccc'] },
        { questionId: 2, question: 'question two', options:['111','222','333'] },
        { questionId: 3, question: 'question three', options:['ee','f','ggg'] },
    ];

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ HttpClientTestingModule ],
            providers: [ QuizService ]
        });

        quizService = TestBed.get(QuizService);
        httpTestingController = TestBed.get(HttpTestingController);
    });

    afterEach(() => {
        httpTestingController.verify();
    });

    it('should GET all quizzes', () => {
        quizService.getAllQuizzes()
            .subscribe((data: Quiz[]) => {
                expect(data.length).toBe(3);
            });
        let quizzesRequest: TestRequest = httpTestingController.expectOne('/api/quizzes');
        expect(quizzesRequest.request.method).toEqual('GET');

        quizzesRequest.flush(testQuizzess);
    });

    it('should return a QuizError', () => {
        quizService.getAllQuizzes()
            .subscribe(
                (data: Quiz[]) => fail('this should have been an error'),
                (err: QuizError) => {
                    expect(err.errorNumber).toEqual(400);
                    expect(err.friendlyMessage).toEqual('An error occurred when retrieving data.');
                }
            );
        let quizzesRequest: TestRequest = httpTestingController.expectOne('/api/quizzes');
        
        quizzesRequest.flush('error', {
            status: 500,
            statusText: 'Server Mock Error'
        });
    });
})