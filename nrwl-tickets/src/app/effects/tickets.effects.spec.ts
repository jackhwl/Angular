import { TestBed } from "@angular/core/testing";
import { Observable } from "rxjs";
import { BackendService } from "../services";
import { TicketsEffects } from "./tickets.effects";
import { TicketsActions, TicketsApiActions } from "../actions";
import { Action } from "@ngrx/store";
import { cold, hot } from "jasmine-marbles";
import { provideMockActions } from "@ngrx/effects/testing";
import { of } from "rxjs";

describe("TicketsEffects", () => {
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
  let ticketService: jasmine.SpyObj<BackendService>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TicketsEffects,
        provideMockActions(() => actions$),
        {
          provide: BackendService,
          useValue: {
            tickets: jasmine.createSpy()
          }
        }
      ]
    });

    effects = TestBed.inject(TicketsEffects);
    ticketService = TestBed.get(BackendService);
  });

  it("should return a stream with todo list loaded action", () => {
    const action = TicketsActions.loadTickets;
    const outcome = TicketsApiActions.loadTicketsSuccess({ tickets });

    actions$ = hot("-a", { a: action });
    const response = cold("-a|", { a: tickets });
    ticketService.tickets.and.returnValue(response);

    const expected = cold("--b", { b: outcome });
    expect(effects.loadTickets$).toBeObservable(expected);
  });
});
