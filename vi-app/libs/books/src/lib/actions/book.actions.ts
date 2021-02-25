import { createAction, props } from '@ngrx/store';
import { Book } from '../models/books';

export const loadBook = createAction(
  '[Book Exists Guard] Load Book',
  props<{ book: Book }>()
);

export type BookActionsUnion = ReturnType<typeof loadBook>;
