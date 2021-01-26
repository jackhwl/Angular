import { JobsEntity } from './jobs.models';
import { State, jobsAdapter, initialState } from './jobs.reducer';
import * as JobsSelectors from './jobs.selectors';

describe('Jobs Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getJobsId = it => it['id'];
  const createJobsEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`
    } as JobsEntity);

  let state;

  beforeEach(() => {
    state = {
      jobs: jobsAdapter.setAll(
        [
          createJobsEntity('PRODUCT-AAA'),
          createJobsEntity('PRODUCT-BBB'),
          createJobsEntity('PRODUCT-CCC')
        ],
        {
          ...initialState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true
        }
      )
    };
  });

  describe('Jobs Selectors', () => {
    it('getAllJobs() should return the list of Jobs', () => {
      const results = JobsSelectors.getAllJobs(state);
      const selId = getJobsId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSelected() should return the selected Entity', () => {
      const result = JobsSelectors.getSelected(state);
      const selId = getJobsId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it("getJobsLoaded() should return the current 'loaded' status", () => {
      const result = JobsSelectors.getJobsLoaded(state);

      expect(result).toBe(true);
    });

    it("getJobsError() should return the current 'error' state", () => {
      const result = JobsSelectors.getJobsError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
