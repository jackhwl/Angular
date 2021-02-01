import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as fromFizzbuzz from './fizzbuzz.reducer';

export interface State {
  fizzbuzz: fromFizzbuzz.State;
}

export const reducers: ActionReducerMap<State> = {
  fizzbuzz: fromFizzbuzz.reducer
};

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? []
  : [];

export const getFizzBuzzState = createFeatureSelector<fromFizzbuzz.State>(
  'fizzbuzz'
);

export const getCounter = createSelector(
  getFizzBuzzState,
  fromFizzbuzz.getCounter
);

export const getMessage = createSelector(
  getCounter,
  counter => {
    let message = '';
    if (counter % 3 === 0) {
      message += 'Fizz';
    }
    if (counter % 5 === 0) {
      message += 'Buzz';
    }
    return message || counter.toString();
  }
);
