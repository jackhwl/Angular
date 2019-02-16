import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { LoggerService } from './logger.service';
import { allReaders, allBooks } from '../data';
import { Reader, Book, BookTrackerError } from 'app/models';

@Injectable()
export class DataService {

  mostPopularBook: Book = allBooks[0];

  getAuthorRecommendation(readerID: number): Promise<string> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (readerID > 0) {
          resolve('Dr. Seuss');
        } else {
          reject('Invalid reader ID');
        }
      }, 2000);
    });
  }

  constructor(private loggerService: LoggerService, private http: HttpClient) { }

  getAllReaders(): Observable<Reader[] | BookTrackerError> {
    return this.http.get<Reader[]>('/api/readers')
      .pipe(
        catchError(this.handleHttpError)
      );
  }

  getReaderById(id: number): Reader {
    return allReaders.find(reader => reader.readerID === id);
  }

  private handleHttpError(error: HttpErrorResponse): Observable<BookTrackerError> {
    let dataError = new BookTrackerError();
    dataError.errorNumber = 100;
    dataError.message = error.statusText;
    dataError.friendlyMessage = 'An error occurred retrieving data.';
    return throwError(dataError);
  }

  getAllBooks(): Book[] {
    return allBooks;
  }

  getBookById(id: number): Book {
    return allBooks.find(book => book.bookID === id);
  }

  setMostPopularBook(popularBook: Book): void {
    this.mostPopularBook = popularBook;
  }
   
}
