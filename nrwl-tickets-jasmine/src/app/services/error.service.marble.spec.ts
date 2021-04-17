import { cold } from "jasmine-marbles";
import { of } from "rxjs";
import { switchMap } from "rxjs/operators";
import { TestScheduler } from "rxjs/testing";
import { ErrorService } from "./error.service";

export const createRetryableStream = (...resp$: any[]): any => {
  const send = jasmine.createSpy("send");
  send.and.returnValues(...resp$);

  return of(undefined).pipe(switchMap(() => send()));
};

describe("error Service (marble tests)", () => {
  let service: ErrorService;
  let scheduler: TestScheduler;
  beforeEach(() => {
    service = new ErrorService();
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  it("retryAfter should retry 3 times every second by default", () => {
    scheduler.run(({ expectObservable }) => {
      const values = { a: { status: 200 } };
      const source$ = createRetryableStream(
        cold("-#"),
        cold("-#"),
        cold("-#"),
        cold("-a", values)
      );
      const fn = service.retryAfter();

      const expectedMarle = "- 1s - 1s - 1s  -a";
      expectObservable(source$.pipe(fn)).toBe(expectedMarle, values);
    });
  });

  it("retryAfter should retry 3 times every second then throw error by default", () => {
    scheduler.run(({ expectObservable }) => {
      const values = { a: { status: 200 } };
      const source$ = createRetryableStream(
        cold("-#"),
        cold("-#"),
        cold("-#"),
        cold("-#"),
        cold("-a", values)
      );
      const fn = service.retryAfter();

      const expectedMarle = "- 1s - 1s - 1s  -#";
      expectObservable(source$.pipe(fn)).toBe(expectedMarle, values);
    });
  });

  it("retryAfter should retry 2 times every 100ms", () => {
    scheduler.run(({ expectObservable }) => {
      const values = { a: { status: 200 } };
      const source$ = createRetryableStream(
        cold("-a", values),
        cold("-#"),
        cold("-a", values)
      );
      const fn = service.retryAfter(100, 2);

      const expectedMarle = "-a";
      expectObservable(source$.pipe(fn)).toBe(expectedMarle, values);
    });
  });

  it("retryAfter should retry 2 times every 100ms", () => {
    scheduler.run(({ expectObservable }) => {
      const values = { a: { status: 200 } };
      const source$ = createRetryableStream(
        cold("-#"),
        cold("-#"),
        cold("-a", values)
      );
      const fn = service.retryAfter(100, 2);

      const expectedMarle = "- 100ms - 100ms -a";
      expectObservable(source$.pipe(fn)).toBe(expectedMarle, values);
    });
  });

  it("retryAfter should retry 2 times every 100ms then throw error", () => {
    scheduler.run(({ expectObservable }) => {
      const values = { a: { status: 200 } };
      const source$ = createRetryableStream(
        cold("-#"),
        cold("-#"),
        cold("-#"),
        cold("-a", values)
      );
      const fn = service.retryAfter(100, 2);

      const expectedMarle = "- 100ms - 100ms -#";
      expectObservable(source$.pipe(fn)).toBe(expectedMarle, values);
    });
  });

  it("retryAfter0 should retry 3 times every 100ms", () => {
    scheduler.run(({ expectObservable }) => {
      const values = { a: { status: 200 } };
      const source$ = createRetryableStream(
        cold("-#"),
        cold("-#"),
        cold("-a", values)
      );
      const fn = service.retryAfter0(100, 3);

      const expectedMarle = "- 100ms - 100ms -a";
      expectObservable(source$.pipe(fn)).toBe(expectedMarle, values);
    });
  });

  it("retryAfter0 should retry 3 times every 100ms then finish", () => {
    scheduler.run(({ expectObservable }) => {
      const values = { a: { status: 200 } };
      const source$ = createRetryableStream(
        cold("-#"),
        cold("-#"),
        cold("-#"),
        cold("-a", values)
      );
      const fn = service.retryAfter0(100, 3);

      const expectedMarle = "- 100ms - 100ms - 100ms |";
      expectObservable(source$.pipe(fn)).toBe(expectedMarle, values);
    });
  });
});
