import { JobsEntity } from './jobs.models';
import * as JobsActions from './jobs.actions';
import { State, initialState, reducer } from './jobs.reducer';

describe('Jobs Reducer', () => {
  const createJobsEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`
    } as JobsEntity);

  beforeEach(() => {});

  describe('valid Jobs actions', () => {
    it('loadJobsSuccess should return set the list of known Jobs', () => {
      const jobs = [
        createJobsEntity('PRODUCT-AAA'),
        createJobsEntity('PRODUCT-zzz')
      ];
      const action = JobsActions.loadJobsSuccess({ jobs });

      const result: State = reducer(initialState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
