import { TestBed } from "@angular/core/testing";
import { Observable, of } from "rxjs";
import { provideMockActions } from "@ngrx/effects/testing";
import { BackendService } from "../services";
import { TicketsEffects } from "./tickets.effects";
import { TicketsActions, TicketsApiActions } from "../actions";

describe("Tickets Effects (Observables)", () => {
  const tickets = [
    {
      id: 0,
      description: "Install a monitor arm",
      assigneeId: 111,
      completed: false
    },
    {
      id: 1,
      description: "Move the desk to the new location",
      assigneeId: 222,
      completed: false
    }
  ];
  let actions$: Observable<any>;
  let effects: TicketsEffects;
  let ticketService: BackendService;
  const mockBackendService = {
    tickets() {
      return of(tickets);
    }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TicketsEffects,
        provideMockActions(() => actions$),
        { provide: BackendService, useValue: mockBackendService }
      ]
    });

    effects = TestBed.inject(TicketsEffects);
    ticketService = TestBed.inject(BackendService);
  });

  describe("loadTickets$", () => {
    it("should return a stream with success action", done => {
      const spy = spyOn(ticketService, "tickets").and.callThrough();
      actions$ = of(TicketsActions.loadTickets());
      effects.loadTickets$.subscribe(res => {
        expect(res).toEqual(TicketsApiActions.loadTicketsSuccess({ tickets }));
      });
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });

    it("should fail and return an action with the error", done => {
      const error = new Error("some error") as any;
      const spy = spyOn(ticketService, "tickets").and.throwError(error);
      actions$ = of(TicketsActions.loadTickets());
      effects.loadTickets$.subscribe(res => {
        expect(res).toEqual(TicketsApiActions.loadTicketsFailure({ error }));
      });
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });
});