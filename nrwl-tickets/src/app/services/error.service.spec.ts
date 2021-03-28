import { of } from "rxjs";
import { ErrorService } from "./error.service";

describe("error Service", () => {
  let service: ErrorService;
  beforeEach(() => {
    service = new ErrorService();
  });

  it("retryAfter should return error", done => {
    const fn = service.retryAfter(100, 2);
    const error = new Error("something wrong @ backend1");
    const act$ = fn(of(error));
    act$.subscribe(_ => {
      expect(_).toBe(error);
      done();
    });
  });

  it("retryAfter0 should return error", done => {
    const fn = service.retryAfter0(100, 2);
    const error = new Error("something wrong @ backend1");
    const act$ = fn(of(error));
    act$.subscribe(_ => {
      expect(_).toBe(error);
      done();
    });
  });
});
