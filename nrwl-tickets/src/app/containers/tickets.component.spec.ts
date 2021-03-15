import { TestBed, async, waitForAsync } from "@angular/core/testing";
import { TicketsFacade } from "../services";
import { TicketsListComponent } from "../components/tickets-list/tickets-list.component";
import { TicketsComponent } from "./tickets.component";
import { provideMockStore, MockStore } from "@ngrx/store/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { FormsModule } from "@angular/forms";
import { By } from "@angular/platform-browser";
import { RouterLinkWithHref } from "@angular/router";
import * as fromTickets from "../reducers/tickets.reducer";
import { TicketDetailsComponent } from "../components/ticket-details/ticket-details.component";
import { MaterialModule } from "../material.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

describe("TicketsComponent", () => {
  const ticketComponents = [
    TicketsListComponent,
    TicketDetailsComponent,
    TicketsComponent
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
  let facade: TicketsFacade;
  let compl: TicketsListComponent;
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: ticketComponents,
        imports: [
          BrowserAnimationsModule,
          RouterTestingModule,
          FormsModule,
          MaterialModule
        ],
        providers: [
          TicketsFacade,
          ...ticketComponents,
          provideMockStore({ initialState })
        ]
      }).compileComponents();

      store = TestBed.inject(MockStore);
      facade = TestBed.inject(TicketsFacade);
      compl = TestBed.inject(TicketsListComponent);
      //spyOn(store, 'dispatch').and.callThrough();
    })
  );

  it("should create the app", async(() => {
    const fixture = TestBed.createComponent(TicketsComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'ticket managing'`, async(() => {
    const fixture = TestBed.createComponent(TicketsComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual("ticket managing");
  }));

  it("should have '/tickets/new' in 'Add New' link", async(() => {
    const fixture = TestBed.createComponent(TicketsComponent);
    fixture.detectChanges();
    const debugElements = fixture.debugElement.queryAll(
      By.directive(RouterLinkWithHref)
    );
    const index = debugElements.findIndex(de => {
      return de.properties["href"] === "/tickets/new";
    });
    expect(index).toBeGreaterThan(-1);
  }));

  it("should create TicketsComponent", () => {
    const fixture = TestBed.createComponent(TicketsComponent);
    const component = fixture.componentInstance;
    expect(component).toBeDefined();
  });

  it("should create TicketsListComponent", () => {
    const fixture = TestBed.createComponent(TicketsListComponent);
    const component = fixture.componentInstance;
    expect(component).toBeDefined();
  });

  it("should have 2 tickets loaded", async(() => {
    const fixture = TestBed.createComponent(TicketsComponent);
    const component = fixture.componentInstance;
    expect(component).toBeDefined();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      fixture.componentInstance.loadTickets();
      const debugElements = fixture.debugElement.queryAll(
        By.directive(TicketsListComponent)
      );
      expect(debugElements.length).toEqual(initialState.tickets.ids.length);
    });
  }));
});
