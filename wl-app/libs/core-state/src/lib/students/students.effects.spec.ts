import { TestBed, async } from '@angular/core/testing';

import { Observable } from 'rxjs';

import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { NxModule, DataPersistence } from '@nrwl/angular';
import { hot } from '@nrwl/angular/testing';

import { StudentsEffects } from './students.effects';
import * as StudentsActions from './students.actions';

describe('StudentsEffects', () => {
  let actions: Observable<any>;
  let effects: StudentsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        StudentsEffects,
        DataPersistence,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.get(StudentsEffects);
  });

  describe('loadStudents$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: StudentsActions.loadStudents() });

      const expected = hot('-a-|', {
        a: StudentsActions.loadStudentsSuccess({ students: [] }),
      });

      expect(effects.loadStudents$).toBeObservable(expected);
    });
  });
});
