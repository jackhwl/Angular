import {
  fakeAsync,
  inject,
  TestBed,
  tick,
  waitForAsync
} from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { By } from "@angular/platform-browser";
import { RouterLinkWithHref } from "@angular/router";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { of } from "rxjs";
import { MaterialModule } from "../../material.module";
import { TicketsComponent } from "./tickets.component";
import { TicketListComponent } from "../ticket-list/ticket-list.component";
import { TicketDetailsComponent } from "../ticket-details/ticket-details.component";
import { provideMockStore, MockStore } from "@ngrx/store/testing";
import { ActionsSubject, StoreModule } from "@ngrx/store";
import * as fromTickets from "../../reducers/ticket.reducer";
import { render, screen, fireEvent } from "@testing-library/angular";
import {
  provideMock,
  Mock,
  createMock
} from "@testing-library/angular/jest-utils";

describe("Tickets Component", () => {
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
  const initialTicketModuleState = {
    users: {},
    tickets: initialState.tickets
  };
  const ticketsFacadeStub = {
    allTicketVms$: of(tickets),
    mutations$: of(false),
    routerRouteParamId$: of(undefined),
    selectTicketById() {},
    loadFilterTicketsByRoute() {},
    loadTickets() {},
    loadUsers() {}
  };
  let store: MockStore;
  let actions$: ActionsSubject;

  beforeEach(
    waitForAsync(() => {
      // const actionSub: ActionsSubject = new ActionsSubject();
      // TestBed.configureTestingModule({
      //   declarations: [
      //     TicketsListComponent,
      //     TicketDetailsComponent,
      //     TicketsComponent
      //   ],
      //   imports: [
      //     BrowserAnimationsModule,
      //     RouterTestingModule,
      //     //FormsModule,
      //     ReactiveFormsModule,
      //     MaterialModule,
      //     StoreModule.forRoot({
      //       [fromTickets.TICKETS_FEATURE_KEY]: fromTickets.ticketsReducer
      //     })
      //   ],
      //   providers: [
      //     provideMockStore({ initialState }),
      //     { provide: ActionsSubject, useValue: actionSub }
      //   ]
      // }).compileComponents();
      // store = TestBed.inject(MockStore);
      // spyOn(store, "dispatch").and.callThrough();
      // actions$ = TestBed.inject(ActionsSubject);
    })
  );

  xit("should create the app", () => {
    const fixture = TestBed.createComponent(TicketsComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it("should have '/tickets/new' in 'Add New Ticket' link", async () => {
    // https://stackoverflow.com/questions/59011530/mock-router-and-ngzone-in-angular-7-jest-unit-test
    const basePath = "base";
    const actionSub: ActionsSubject = new ActionsSubject();
    const { navigate } = await render(TicketsComponent, {
      declarations: [TicketDetailsComponent, TicketListComponent],
      imports: [
        BrowserAnimationsModule,
        RouterTestingModule,
        ReactiveFormsModule,
        MaterialModule,
        StoreModule.forRoot({
          [fromTickets.TICKETS_FEATURE_KEY]: fromTickets.reducer
        })
      ],
      componentProviders: [
        provideMockStore({ initialState }),
        {
          provide: ActionsSubject,
          useValue: actionSub
        }
      ],
      routes: [
        {
          path: "tickets",
          loadChildren: () =>
            import("../../tickets.module").then(m => m.TicketsModule)
        }
      ]
    });

    const store = TestBed.inject(MockStore);
    store.dispatch = jest.fn();
    //expect(screen.getByRole('link', {name: /add new ticket/i})).toBeInTheDocument();
  });
});
