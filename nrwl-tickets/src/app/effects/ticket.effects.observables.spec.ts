import { TestBed } from "@angular/core/testing";
import { Observable, of } from "rxjs";
import { provideMockActions } from "@ngrx/effects/testing";
import { BackendService } from "../services";
import { TicketsEffects } from "./ticket.effects";
import { TicketActions, TicketApiActions } from "../actions";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { routerNavigatedAction, routerReducer } from "@ngrx/router-store";

describe("Tickets Effects (Observables)", () => {
  const newTicket = {
    id: 10,
    description: "Install a monitor arm",
    assigneeId: 111,
    completed: false
  };
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
    },
    newTicket(payload) {
      return of(newTicket);
    },
    update(id, updates) {
      return of(newTicket);
    },
    filteredTickets(q) {
      return of(tickets);
    },
    ticket() {
      return of(tickets[1]);
    }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({ router: routerReducer }),
        EffectsModule.forRoot([])
      ],
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
      actions$ = of(TicketActions.loadTickets());
      effects.loadTickets$.subscribe(res => {
        expect(res).toEqual(TicketApiActions.loadTicketsSuccess({ tickets }));
      });
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });

    it("should fail and return an action with the error", done => {
      const error = new Error("some error") as any;
      const spy = spyOn(ticketService, "tickets").and.throwError(error);
      actions$ = of(TicketActions.loadTickets());
      effects.loadTickets$.subscribe(res => {
        expect(res).toEqual(TicketApiActions.loadTicketsFailure({ error }));
      });
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });

  describe("loadFilterTickets$", () => {
    it("should return a stream with success action", done => {
      const spy = spyOn(ticketService, "filteredTickets").and.callThrough();
      actions$ = of(TicketActions.loadFilterTickets({ queryStr: "" }));
      effects.loadFilterTickets$.subscribe(res => {
        expect(res).toEqual(
          TicketApiActions.loadFilterTicketsSuccess({ tickets })
        );
      });
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });

    it("should fail and return an action with the error", done => {
      const error = new Error("some error") as any;
      const spy = spyOn(ticketService, "filteredTickets").and.throwError(error);
      actions$ = of(TicketActions.loadFilterTickets({ queryStr: "" }));
      effects.loadFilterTickets$.subscribe(res => {
        expect(res).toEqual(
          TicketApiActions.loadFilterTicketsFailure({ error })
        );
      });
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });

  describe("routerNavigatedAction$", () => {
    it("should return a stream with success action", done => {
      const spy = spyOn(ticketService, "filteredTickets").and.callThrough();
      actions$ = of(routerNavigatedAction);
      effects.loadFilterTicketsByRoute$.subscribe(res => {
        expect(res).toEqual(
          TicketApiActions.loadFilterTicketsSuccess({ tickets })
        );
      });
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });

    it("should fail and return an action with the error", done => {
      const error = new Error("some error") as any;
      const spy = spyOn(ticketService, "filteredTickets").and.throwError(error);
      actions$ = of(routerNavigatedAction);
      effects.loadFilterTicketsByRoute$.subscribe(res => {
        expect(res).toEqual(
          TicketApiActions.loadFilterTicketsFailure({ error })
        );
      });
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });

  describe("loadTicket$", () => {
    it("should return a ticket with success action", done => {
      const spy = spyOn(ticketService, "ticket").and.callThrough();
      actions$ = of(TicketActions.loadTicket({ ticket: tickets[1] }));
      effects.loadTicket$.subscribe(res => {
        expect(res).toEqual(
          TicketApiActions.loadTicketSuccess({ ticket: tickets[1] })
        );
      });
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });

    it("should fail and return an action with the error", done => {
      const error = new Error("some error") as any;
      const spy = spyOn(ticketService, "ticket").and.throwError(error);
      actions$ = of(TicketActions.loadTicket({ ticket: tickets[1] }));
      effects.loadTicket$.subscribe(res => {
        expect(res).toEqual(TicketApiActions.loadTicketFailure({ error }));
      });
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });

  describe("createTicket$", () => {
    it("should return a new ticket with success action", done => {
      const spy = spyOn(ticketService, "newTicket").and.callThrough();
      actions$ = of(TicketActions.createTicket({ ticket: newTicket }));
      effects.createTicket$.subscribe(res => {
        expect(res).toEqual(
          TicketApiActions.createTicketSuccess({ ticket: newTicket })
        );
      });
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });

    it("should fail and return an action with the error", done => {
      const error = new Error("some error") as any;
      const spy = spyOn(ticketService, "newTicket").and.throwError(error);
      actions$ = of(TicketActions.createTicket({ ticket: newTicket }));
      effects.createTicket$.subscribe(res => {
        expect(res).toEqual(TicketApiActions.createTicketFailure({ error }));
      });
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });

  describe("updateTicket$", () => {
    it("should return a updated ticket with success action", done => {
      const spy = spyOn(ticketService, "update").and.callThrough();
      actions$ = of(TicketActions.updateTicket({ ticket: newTicket }));
      effects.updateTicket$.subscribe(res => {
        expect(res).toEqual(
          TicketApiActions.updateTicketSuccess({ ticket: newTicket })
        );
      });
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });

    it("should fail and return an action with the error", done => {
      const error = new Error("some error") as any;
      const spy = spyOn(ticketService, "update").and.throwError(error);
      actions$ = of(TicketActions.updateTicket({ ticket: newTicket }));
      effects.updateTicket$.subscribe(res => {
        expect(res).toEqual(TicketApiActions.updateTicketFailure({ error }));
      });
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });
});
