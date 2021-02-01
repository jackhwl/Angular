import { createAction, props, Action } from '@ngrx/store';

// action enum
export enum FizzBuzzActionTypes {
  Next = '[AppComponent] Next'
}
// action creator
export class Next implements Action {
  readonly type = FizzBuzzActionTypes.Next;
}
// actions union type, add more Actions using a pipe '|'
export type FizzBuzzActions = Next;

// export const loadFizzbuzzs = createAction(
//   '[Fizzbuzz] Load Fizzbuzzs'
// );
