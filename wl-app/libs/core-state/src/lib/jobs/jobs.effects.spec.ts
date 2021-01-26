import { TestBed, async } from '@angular/core/testing';

import { Observable } from 'rxjs';

import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { NxModule, DataPersistence } from '@nrwl/angular';
import { hot } from '@nrwl/angular/testing';

import { JobsEffects } from './jobs.effects';
import * as JobsActions from './jobs.actions';

describe('JobsEffects', () => {
  let actions: Observable<any>;
  let effects: JobsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        JobsEffects,
        DataPersistence,
        provideMockActions(() => actions),
        provideMockStore()
      ]
    });

    effects = TestBed.get(JobsEffects);
  });

  describe('loadJobs$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: JobsActions.loadJobs() });

      const expected = hot('-a-|', {
        a: JobsActions.loadJobsSuccess({ jobs: [] })
      });

      expect(effects.loadJobs$).toBeObservable(expected);
    });
  });
});
