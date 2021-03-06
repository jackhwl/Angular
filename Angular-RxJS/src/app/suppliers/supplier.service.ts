import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { throwError, Observable, of } from 'rxjs';
import {
  catchError,
  concatMap,
  map,
  mergeMap,
  shareReplay,
  switchMap,
  tap
} from 'rxjs/operators';
import { Supplier } from './supplier';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {
  suppliersUrl = 'api/suppliers';

  suppliers$ = this.http.get<Supplier[]>(this.suppliersUrl).pipe(
    tap(data => console.log('suppliers', JSON.stringify(data))),
    shareReplay(1),
    catchError(this.handleError)
  );

  suppliersWithMaps$ = of(1, 5, 8).pipe(
    tap(id => console.log('concatMap source Obserable', id)),
    concatMap(id => this.http.get<Supplier>(`${this.suppliersUrl}/${id}`))
  );

  suppliersWithMergeMaps$ = of(1, 5, 8).pipe(
    tap(id => console.log('mergeMap source Obserable', id)),
    mergeMap(id => this.http.get<Supplier>(`${this.suppliersUrl}/${id}`))
  );

  suppliersWithSwitchMaps$ = of(1, 5, 8).pipe(
    tap(id => console.log('switchMap source Obserable', id)),
    switchMap(id => this.http.get<Supplier>(`${this.suppliersUrl}/${id}`))
  );

  constructor(private http: HttpClient) {
    this.suppliersWithMaps$.subscribe(item =>
      console.log('concat map result', item)
    );
    this.suppliersWithMergeMaps$.subscribe(item =>
      console.log('merge map result', item)
    );
    this.suppliersWithSwitchMaps$.subscribe(item =>
      console.log('switch map result', item)
    );
  }

  private handleError(err: any): Observable<never> {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }
}
