import { ActionReducerMap, MetaReducer } from '@ngrx/store';
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
