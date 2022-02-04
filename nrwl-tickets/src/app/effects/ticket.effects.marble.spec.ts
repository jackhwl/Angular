import { TestBed } from "@angular/core/testing";
import { Observable } from "rxjs";
import { Action, StoreModule } from "@ngrx/store";
import { cold, hot } from "jasmine-marbles";
import { provideMockActions } from "@ngrx/effects/testing";
import { BackendService } from "../services";
import { TicketsEffects } from "./ticket.effects";
import { TicketActions, TicketApiActions } from "../actions";
import { EffectsModule } from "@ngrx/effects";
import { routerReducer } from "@ngrx/router-store";
import { TicketService } from "../services/ticket.service";

describe("Tickets Effects (Marble)", () => {
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
  let actions$: Observable<Action>;
  let effects: TicketsEffects;
  let ticketService: jasmine.SpyObj<TicketService>;
  const ticketServiceSpy = jasmine.createSpyObj("BackendService", ["tickets"]);
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({ router: routerReducer }),
        EffectsModule.forRoot([])
      ],
      providers: [
        TicketsEffects,
        provideMockActions(() => actions$),
        { provide: BackendService, useValue: ticketServiceSpy }
      ]
    });

    effects = TestBed.inject(TicketsEffects);
    ticketService = TestBed.inject(BackendService) as jasmine.SpyObj<
      BackendService
    >;
  });

  describe("loadTickets$", () => {
    it("should return a stream with success action", () => {
      const action = TicketActions.loadTickets();
      const outcome = TicketApiActions.loadTicketsSuccess({ tickets });
      const values = { a: action, b: tickets, c: outcome };

      actions$ = hot("-a", values);
      const response = cold("-b|", values);
      ticketService.tickets.and.returnValue(response);

      const expected = cold("--c", values);
      expect(effects.loadTickets$).toBeObservable(expected);
    });

    it("should fail and return an action with the error", () => {
      const action = TicketActions.loadTickets();
      const error = new Error("some error") as any;
      const outcome = TicketApiActions.loadTicketsFailure({ error });
      const values = { a: action, b: tickets, c: outcome };

      actions$ = hot("-a", values);
      const response = cold("-#|", values, error);
      ticketService.tickets.and.returnValue(response);

      const expected = cold("--c", values);
      expect(effects.loadTickets$).toBeObservable(expected);
    });
  });
});
