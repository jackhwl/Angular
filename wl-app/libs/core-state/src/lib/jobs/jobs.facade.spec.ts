import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { readFirst } from '@nrwl/angular/testing';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';

import { NxModule } from '@nrwl/angular';

import { JobsEntity } from './jobs.models';
import { JobsEffects } from './jobs.effects';
import { JobsFacade } from './jobs.facade';

import * as JobsSelectors from './jobs.selectors';
import * as JobsActions from './jobs.actions';
import { JOBS_FEATURE_KEY, State, initialState, reducer } from './jobs.reducer';

interface TestSchema {
  jobs: State;
}

describe('JobsFacade', () => {
  let facade: JobsFacade;
  let store: Store<TestSchema>;
  const createJobsEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`
    } as JobsEntity);

  beforeEach(() => {});

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(JOBS_FEATURE_KEY, reducer),
          EffectsModule.forFeature([JobsEffects])
        ],
        providers: [JobsFacade]
      })
      class CustomFeatureModule {}

      @NgModule({
        imports: [
          NxModule.forRoot(),
          StoreModule.forRoot({}),
          EffectsModule.forRoot([]),
          CustomFeatureModule
        ]
      })
      class RootModule {}
      TestBed.configureTestingModule({ imports: [RootModule] });

      store = TestBed.get(Store);
      facade = TestBed.get(JobsFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async done => {
      try {
        let list = await readFirst(facade.allJobs$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        facade.dispatch(JobsActions.loadJobs());

        list = await readFirst(facade.allJobs$);
        isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(true);

        done();
      } catch (err) {
        done.fail(err);
      }
    });

    /**
     * Use `loadJobsSuccess` to manually update list
     */
    it('allJobs$ should return the loaded list; and loaded flag == true', async done => {
      try {
        let list = await readFirst(facade.allJobs$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        facade.dispatch(
          JobsActions.loadJobsSuccess({
            jobs: [createJobsEntity('AAA'), createJobsEntity('BBB')]
          })
        );

        list = await readFirst(facade.allJobs$);
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
