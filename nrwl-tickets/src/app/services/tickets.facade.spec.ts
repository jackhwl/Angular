import { TestBed, waitForAsync } from "@angular/core/testing";
import { BackendService, TicketsFacade } from "../services";
import { TicketsListComponent } from "../components/tickets-list/tickets-list.component";
import { provideMockStore, MockStore } from "@ngrx/store/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { FormsModule } from "@angular/forms";
import * as fromTickets from "../reducers/tickets.reducer";
import { MaterialModule } from "../material.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { TicketsEffects } from "../effects/tickets.effects";
import { TicketsActions } from "../actions";

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
  beforeEach(
    waitForAsync(() => {
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
          provideMockStore({ initialState })
        ]
      }).compileComponents();

      store = TestBed.inject(MockStore);
      ticketsFacade = TestBed.inject(TicketsFacade);
      spyOn(store, "dispatch").and.callThrough();
    })
  );

  it("should dispatch load Tickets action when call getAll method", () => {
    ticketsFacade.getAll();
    expect(store.dispatch).toHaveBeenCalledWith(TicketsActions.loadTickets());
  });

  it("should dispatch create Ticket action when call createTicket method", () => {
    ticketsFacade.createTicket(ticket);
    expect(store.dispatch).toHaveBeenCalledWith(
      TicketsActions.createTicket({ ticket })
    );
  });
});
