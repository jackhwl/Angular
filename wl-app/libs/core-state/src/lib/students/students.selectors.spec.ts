import { StudentsEntity } from './students.models';
import { State, studentsAdapter, initialState } from './students.reducer';
import * as StudentsSelectors from './students.selectors';

describe('Students Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getStudentsId = (it) => it['id'];
  const createStudentsEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as StudentsEntity);

  let state;

  beforeEach(() => {
    state = {
      students: studentsAdapter.setAll(
        [
          createStudentsEntity('PRODUCT-AAA'),
          createStudentsEntity('PRODUCT-BBB'),
          createStudentsEntity('PRODUCT-CCC'),
        ],
        {
          ...initialState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('Students Selectors', () => {
    it('getAllStudents() should return the list of Students', () => {
      const results = StudentsSelectors.getAllStudents(state);
      const selId = getStudentsId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSelected() should return the selected Entity', () => {
      const result = StudentsSelectors.getSelected(state);
      const selId = getStudentsId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it("getStudentsLoaded() should return the current 'loaded' status", () => {
      const result = StudentsSelectors.getStudentsLoaded(state);

      expect(result).toBe(true);
    });

    it("getStudentsError() should return the current 'error' state", () => {
      const result = StudentsSelectors.getStudentsError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
