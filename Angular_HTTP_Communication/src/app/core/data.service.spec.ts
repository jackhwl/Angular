import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';

import { DataService } from './data.service';
import { Book } from 'app/models/book';

describe('DataService Tests', () => {
    let dataService: DataService;
    let httpTestingController: HttpTestingController;

    let testBooks: Book[] = [
        { bookID: 1, title: 'Goodnight Moon', author: 'Margaret Wise Brown', publicationYear: 1953 },
        { bookID: 2, title: 'Winnie-the-Pooh', author: 'A. A. Milne', publicationYear: 1926 },
        { bookID: 3, title: 'The Hobbit', author: 'J. R. R. Tolkien', publicationYear: 1937 }
    ];

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ HttpClientTestingModule ],
            providers: [ DataService ]
        });

        dataService = TestBed.get(DataService);
        httpTestingController = TestBed.get(HttpTestingController);
    });

    it('test 1', () => {
        
    });
})