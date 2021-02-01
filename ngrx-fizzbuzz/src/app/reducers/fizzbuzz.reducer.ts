import { Action, createReducer, on } from '@ngrx/store';

export const fizzbuzzFeatureKey = 'fizzbuzz';

export interface State {
  counter: number;
  message: string;
}

export const initialState: State = {
  counter: 1,
  message: ''
};

export function reducer(state = initialState, action: Action): State {
  switch (action.type) {
    case 'NEXT':
      const counter = state.counter + 1;
      let message = '';
      if (counter % 3 === 0) {
        message += 'Fizz';
      }
      if (counter % 5 === 0) {
        message += 'Buzz';
      }
      return {
        counter,
        message: message || counter.toString()
      };
    default:
      return state;
  }
}
//export const reducer = createReducer(initialState);
