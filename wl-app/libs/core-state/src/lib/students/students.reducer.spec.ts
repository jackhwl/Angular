import { StudentsEntity } from './students.models';
import * as StudentsActions from './students.actions';
import { State, initialState, reducer } from './students.reducer';

describe('Students Reducer', () => {
  const createStudentsEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as StudentsEntity);

  beforeEach(() => {});

  describe('valid Students actions', () => {
    it('loadStudentsSuccess should return set the list of known Students', () => {
      const students = [
        createStudentsEntity('PRODUCT-AAA'),
        createStudentsEntity('PRODUCT-zzz'),
      ];
      const action = StudentsActions.loadStudentsSuccess({ students });

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
