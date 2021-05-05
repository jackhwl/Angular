import { TestBed, waitForAsync } from "@angular/core/testing";
import { BackendService, TicketsFacade } from "../services";
import { TicketsListComponent } from "../containers/tickets-list/tickets-list.component";
import { provideMockStore, MockStore } from "@ngrx/store/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { FormsModule } from "@angular/forms";
import * as fromTickets from "../reducers/tickets.reducer";
import { MaterialModule } from "../material.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ActionsSubject, StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { TicketsEffects } from "../effects/tickets.effects";
import { TicketsActions, TicketsApiActions, UsersActions } from "../actions";
import { cold, hot } from "jasmine-marbles";
import { routerNavigatedAction } from "@ngrx/router-store";
import { map } from "rxjs/operators";

describe("Tickets Facade", () => {
  const ticket = {
    id: 0,
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
    },
    {
      id: 2,
      description: "Regiter online",
      assigneeId: 333,
      completed: false
    }
  ];
  const users = [
    { id: 111, name: "Victor" },
    { id: 222, name: "Jack" },
    { id: 333, name: "Wenlin" }
  ];
  const ticketVms = [
    {
      id: 0,
      description: "Install a monitor arm",
      assigneeId: 111,
      assignees: [{ id: 111, name: "Victor" }],
      completed: false
    },
    {
      id: 1,
      description: "Move the desk to the new location",
      assigneeId: 222,
      assignees: [{ id: 222, name: "Jack" }],
      completed: false
    },
    {
      id: 2,
      description: "Regiter online",
      assigneeId: 333,
      assignees: [{ id: 333, name: "Wenlin" }],
      completed: false
    }
  ];
  const initialState = {
    tickets: {
      ids: [0, 1],
      entities: {
        0: {
          id: 0,
          description: "Install a monitor arm",
          assigneeId: 111,
          completed: false
        },
        1: {
          id: 1,
          description: "Move the desk to the new location",
          assigneeId: 111,
          completed: false
        }
      },
      error: null,
      loaded: false,
      selectedId: null
    }
  };

  let store: MockStore;
  let ticketsFacade: TicketsFacade;
  let compl: TicketsListComponent;
  let actions$: ActionsSubject;
  beforeEach(
    waitForAsync(() => {
      const actionSub: ActionsSubject = new ActionsSubject();
      TestBed.configureTestingModule({
        declarations: [],
        imports: [
          BrowserAnimationsModule,
          RouterTestingModule,
          FormsModule,
          MaterialModule,
          StoreModule.forRoot({
            [fromTickets.TICKETS_FEATURE_KEY]: fromTickets.ticketsReducer
          }),
          EffectsModule.forRoot([TicketsEffects])
        ],
        providers: [
          TicketsFacade,
          BackendService,
          provideMockStore({ initialState }),
          { provide: ActionsSubject, useValue: actionSub }
        ]
      }).compileComponents();

      store = TestBed.inject(MockStore);
      ticketsFacade = TestBed.inject(TicketsFacade);
      spyOn(store, "dispatch").and.callThrough();
      actions$ = TestBed.inject(ActionsSubject);
      //spyOn(ticketsFacade, "getMutations").and.callThrough();
    })
  );

  it("should dispatch selectTicketById action when call selectTicketById method", () => {
    ticketsFacade.selectTicketById("1");
    expect(store.dispatch).toHaveBeenCalledWith(
      TicketsActions.selectTicketById({ selectedId: "1" })
    );
  });

  it("should dispatch selectTicket action when call selectTicket method", () => {
    ticketsFacade.selectTicket(ticket);
    expect(store.dispatch).toHaveBeenCalledWith(
      TicketsActions.selectTicket({ ticket })
    );
  });

  it("should dispatch selectTicketByRoute action when call selectTicketByRoute method", () => {
    ticketsFacade.selectTicketByRoute();
    expect(store.dispatch).toHaveBeenCalledWith(
      TicketsActions.selectTicketByRoute()
    );
  });

  it("should dispatch load Tickets action when call loadAll method", () => {
    ticketsFacade.loadAll();
    expect(store.dispatch).toHaveBeenCalledWith(TicketsActions.loadTickets());
  });

  it("should dispatch load Tickets action when call loadTickets method", () => {
    ticketsFacade.loadTickets();
    expect(store.dispatch).toHaveBeenCalledWith(TicketsActions.loadTickets());
  });

  it("should dispatch loadFilterTickets action when call loadFilterTickets method", () => {
    ticketsFacade.loadFilterTickets("q");
    expect(store.dispatch).toHaveBeenCalledWith(
      TicketsActions.loadFilterTickets({ queryStr: "q" })
    );
  });

  it("should dispatch loadFilterTicketsByRoute action when call loadFilterTicketsByRoute method", () => {
    ticketsFacade.loadFilterTicketsByRoute();
    expect(store.dispatch).toHaveBeenCalledWith(
      TicketsActions.loadFilterTicketsByRoute()
    );
  });

  it("should dispatch load Users action when call loadUsers method", () => {
    ticketsFacade.loadUsers();
    expect(store.dispatch).toHaveBeenCalledWith(UsersActions.loadUsers());
  });

  it("should dispatch create Ticket action when call createTicket method", () => {
    ticketsFacade.createTicket(ticket);
    expect(store.dispatch).toHaveBeenCalledWith(
      TicketsActions.createTicket({ ticket })
    );
  });

  it("should dispatch update Ticket action when call updateTicket method", () => {
    ticketsFacade.updateTicket(ticket);
    expect(store.dispatch).toHaveBeenCalledWith(
      TicketsActions.updateTicket({ ticket })
    );
  });

  it("should dispatch delete Ticket action when call deleteTicket method", () => {
    ticketsFacade.deleteTicket(ticket);
    expect(store.dispatch).toHaveBeenCalledWith(
      TicketsActions.deleteTicket({ ticket })
    );
  });

  it("allTicketVms$ should return ticketVm", () => {
    ticketsFacade.allUsers$ = cold("-a", { a: users });
    ticketsFacade.allTickets$ = cold("-b", { b: tickets });
    const expected$ = hot("-c", { c: ticketVms });

    expect(ticketsFacade.getAllTicketVms()).toBeObservable(expected$);
  });

  xit("mutations$ should return true when TicketsApiActions.createTicketSuccess emit", () => {
    actions$.next(TicketsApiActions.createTicketSuccess({ ticket }));
    const expected$ = cold("c", { c: true });

    // expect(ticketsFacade.getMutations().pipe(map(_ => true))).toBeObservable(
    //   expected$
    // );
  });

  xit("mutations$ should return true when TicketsApiActions.updateTicketSuccess emit", () => {
    actions$.next(TicketsApiActions.updateTicketSuccess({ ticket }));
    const expected$ = cold("c", { c: true });

    // expect(ticketsFacade.getMutations().pipe(map(_ => true))).toBeObservable(
    //   expected$
    // );
  });

  xit("mutations$ should return true when routerNavigatedAction emit", () => {
    actions$.next(routerNavigatedAction({ payload: null }));
    const expected$ = cold("c", { c: true });

    // expect(ticketsFacade.getMutations().pipe(map(_ => true))).toBeObservable(
    //   expected$
    // );
  });

  xit("mutations$ should not return anything when TicketsApiActions.updateTicketFailure emit", () => {
    actions$.next(TicketsApiActions.updateTicketFailure({ error: "eee" }));
    const expected$ = cold("c", { c: true });

    // expect(
    //   ticketsFacade.getMutations().pipe(map(_ => true))
    // ).not.toBeObservable(expected$);
  });
});
