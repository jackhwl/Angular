import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { interval } from 'rxjs';
import { mapTo } from 'rxjs/operators';
import { Next } from '../actions/fizzbuzz.actions';

@Injectable()
export class AppEffects {
  @Effect()
  fizzbuzzes = interval(1000).pipe(mapTo(new Next()));
}
