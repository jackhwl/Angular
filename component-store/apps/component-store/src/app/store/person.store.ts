import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Observable } from 'rxjs';
import { switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { Person } from '../models/person';
import { StarWarsApiService } from '../services/star-wars-api.service';

export interface PersonState {
  people: Person[];
  editorId: number | undefined;
  editedPerson: Person | undefined;
}

const defaultState: PersonState = {
  people: [],
  editorId: undefined,
  editedPerson: undefined
};

@Injectable()
export class PersonStore extends ComponentStore<PersonState> {
  constructor(private readonly _starWarsApi: StarWarsApiService) {
    super(defaultState);
  }

  readonly editorId$ = this.select(({ editorId }) => editorId)
  readonly editedPerson$ = this.select(({ editedPerson }) => editedPerson).pipe(
    tap((person) => console.log('editedPerson$', person))
  )
  readonly people$ = this.select(({ people }) => people);

  readonly setEditorId = this.updater((state, editorId: number | undefined) => ({
    ...state,
    editorId
  }))
  readonly setEditedPerson = this.updater((state, editedPerson: Person | undefined) => ({
    ...state,
    editedPerson
  }))
  readonly loadPeople = this.updater((state, people: Person[] | null) => ({
    ...state,
    people: people || [],
  }));
  readonly editPerson = this.effect(
    (personId$: Observable<number | undefined>) =>
      personId$.pipe(
        withLatestFrom(this.people$),
        tap<[number | undefined, Person[]]>(([id, people]) => {
          this.setEditorId(id);

          const personToEdit = !id && id !== 0 ? undefined : people.find((person) => person.id === id);

          this.setEditedPerson({ ...personToEdit });
        })
      )
  )
  // public readonly loadPeople2 = this.effect((trigger$: Observable<void>) =>
  //       trigger$.pipe(
  //           switchMap(() => {
  //               this.patchState({ items: [], loading: true });

  //               return this.itemService.getItems().pipe(
  //                   tap(items => this.patchState({ items, loading: false })),
  //                   catchError((err) => {
  //                       this.patchState({ 
  //                           items: [], 
  //                           loading: false, 
  //                           error: err.message,
  //                       });
  //                       return EMPTY;
  //                   }),
  //               );
  //           }),
  //       ),
  //   );
}
