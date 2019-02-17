import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';

import { QuizService } from './quiz.service';
import { Quiz } from '../models';

describe('QuizService Tests', () => {
    let QuizService: QuizService;
    let httpTestingController: HttpTestingController;

    let testBooks: Book[] = [
        { bookID: 1, title: 'Goodnight Moon', author: 'Margaret Wise Brown', publicationYear: 1953 },
        { bookID: 2, title: 'Winnie-the-Pooh', author: 'A. A. Milne', publicationYear: 1926 },
        { bookID: 3, title: 'The Hobbit', author: 'J. R. R. Tolkien', publicationYear: 1937 }
    ];

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ HttpClientTestingModule ],
            providers: [ QuizService ]
        });

        QuizService = TestBed.get(QuizService);
        httpTestingController = TestBed.get(HttpTestingController);
    });

    afterEach(() => {
        httpTestingController.verify();
    });

    it('should GET all books', () => {
        QuizService.getAllBooks()
            .subscribe((data: Book[]) => {
                expect(data.length).toBe(3);
            });
        let booksRequest: TestRequest = httpTestingController.expectOne('/api/books');
        expect(booksRequest.request.method).toEqual('GET');

        booksRequest.flush(testBooks);
    });

    it('should return a BookTrackerError', () => {
        QuizService.getAllBooks()
            .subscribe(
                (data: Book[]) => fail('this should have been an error'),
                (err: BookTrackerError) => {
                    expect(err.errorNumber).toEqual(100);
                    expect(err.friendlyMessage).toEqual('An error occurred retrieving data.');
                }
            );
        let booksRequest: TestRequest = httpTestingController.expectOne('/api/books');
        
        booksRequest.flush('error', {
            status: 500,
            statusText: 'Server Mock Error'
        });
    });
})