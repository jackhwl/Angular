import { TestScheduler } from 'rxjs/testing';

describe('getting started with RxJS testing with marbles', () => {
  let testScheduler: TestScheduler;

  beforeEach(() => {
    testScheduler = new TestScheduler((actual, expected) =>
      expect(actual).toEqual(expected)
    );
  });

  test('subscribe', () => {
    testScheduler.run(({ hot, expectObservable }) => {
      const values = {
        a: 0,
        b: 1,
        c: 2
      };
      const source = hot('100ms a 99ms b 99ms c|', values);
      const subscription1 = '   200ms ^ 100ms !';
      const subscription2 = '           300ms ^';
      const expected1 = '        200ms b 99ms c';
      const expected2 = '               300ms c|';
      expectObservable(source, subscription1).toBe(expected1, values);
      expectObservable(source, subscription2).toBe(expected2, values);
    });
  });
});
