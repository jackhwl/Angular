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
      const actionSub: ActionsSubject = new ActionsSubject();
      TestBed.configureTestingModule({
        declarations: [
          TicketListComponent,
          TicketDetailsComponent,
          TicketsComponent
        ],
        imports: [
          BrowserAnimationsModule,
          RouterTestingModule,
          //FormsModule,
          ReactiveFormsModule,
          MaterialModule,
          StoreModule.forRoot({
            [fromTickets.TICKETS_FEATURE_KEY]: fromTickets.ticketsReducer
          })
        ],
        providers: [
          provideMockStore({ initialState }),
          { provide: ActionsSubject, useValue: actionSub }
        ]
      }).compileComponents();

      store = TestBed.inject(MockStore);
      spyOn(store, "dispatch").and.callThrough();
      actions$ = TestBed.inject(ActionsSubject);
    })
  );

  it("should create the app", () => {
    const fixture = TestBed.createComponent(TicketsComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it("should have '/tickets/new' in 'Add New' link", () => {
    const fixture = TestBed.createComponent(TicketsComponent);
    fixture.detectChanges();
    const debugElements = fixture.debugElement.queryAll(
      By.directive(RouterLinkWithHref)
    );
    const index = debugElements.findIndex(de => {
      return de.properties["href"] === "/tickets/new";
    });
    expect(index).toBeGreaterThan(-1);
  });

  it("should create TicketsComponent", () => {
    const fixture = TestBed.createComponent(TicketsComponent);
    const component = fixture.componentInstance;
    expect(component).toBeDefined();
  });

  it("should create TicketsListComponent", () => {
    const fixture = TestBed.createComponent(TicketListComponent);
    const component = fixture.componentInstance;
    expect(component).toBeDefined();
  });

  xit("should have TicketsListComponent render", fakeAsync(() => {
    const fixture = TestBed.createComponent(TicketsComponent);
    fixture.detectChanges();
    const component = fixture.componentInstance;
    component.ngOnInit();
    fixture.detectChanges();
    //ticketsFacade.allTicketVms$.subscribe(_=> console.log('_333',_));
    component.search.setValue("a");
    tick(210);
    const debugElements = fixture.debugElement.queryAll(
      By.directive(TicketListComponent)
    );
    expect(debugElements.length).toEqual(1);
  }));

  xit(`should have ${tickets.length} tickets render`, fakeAsync(() => {
    const fixture = TestBed.createComponent(TicketsComponent);
    const component = fixture.componentInstance;

    component.ngOnInit();
    fixture.detectChanges();
    component.search.setValue("a");
    tick(210);
    fixture.whenStable().then(() => {
      const debugElements = fixture.debugElement.queryAll(
        By.css(".mat-list-text")
      );
      expect(debugElements.length).toEqual(tickets.length);
    });
  }));
});
