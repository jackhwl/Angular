import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { readFirst } from '@nrwl/angular/testing';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';

import { NxModule } from '@nrwl/angular';

import { StudentsEntity } from './students.models';
import { StudentsEffects } from './students.effects';
import { StudentsFacade } from './students.facade';

import * as StudentsSelectors from './students.selectors';
import * as StudentsActions from './students.actions';
import {
  STUDENTS_FEATURE_KEY,
  State,
  initialState,
  reducer,
} from './students.reducer';

interface TestSchema {
  students: State;
}

describe('StudentsFacade', () => {
  let facade: StudentsFacade;
  let store: Store<TestSchema>;
  const createStudentsEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as StudentsEntity);

  beforeEach(() => {});

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(STUDENTS_FEATURE_KEY, reducer),
          EffectsModule.forFeature([StudentsEffects]),
        ],
        providers: [StudentsFacade],
      })
      class CustomFeatureModule {}

      @NgModule({
        imports: [
          NxModule.forRoot(),
          StoreModule.forRoot({}),
          EffectsModule.forRoot([]),
          CustomFeatureModule,
        ],
      })
      class RootModule {}
      TestBed.configureTestingModule({ imports: [RootModule] });

      store = TestBed.get(Store);
      facade = TestBed.get(StudentsFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async (done) => {
      try {
        let list = await readFirst(facade.allStudents$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        facade.dispatch(StudentsActions.loadStudents());

        list = await readFirst(facade.allStudents$);
        isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(true);

        done();
      } catch (err) {
        done.fail(err);
      }
    });

    /**
     * Use `loadStudentsSuccess` to manually update list
     */
    it('allStudents$ should return the loaded list; and loaded flag == true', async (done) => {
      try {
        let list = await readFirst(facade.allStudents$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        facade.dispatch(
          StudentsActions.loadStudentsSuccess({
            students: [
              createStudentsEntity('AAA'),
              createStudentsEntity('BBB'),
            ],
          })
        );

        list = await readFirst(facade.allStudents$);
        isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(2);
        expect(isLoaded).toBe(true);

        done();
      } catch (err) {
        done.fail(err);
      }
    });
  });
});
