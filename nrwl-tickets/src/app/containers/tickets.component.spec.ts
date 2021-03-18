import { TestBed, waitForAsync } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { FormsModule } from "@angular/forms";
import { By } from "@angular/platform-browser";
import { RouterLinkWithHref } from "@angular/router";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { of } from "rxjs";
import { MaterialModule } from "../material.module";
import { TicketsComponent } from "./tickets.component";
import { TicketsListComponent } from "../components/tickets-list/tickets-list.component";
import { TicketDetailsComponent } from "../components/ticket-details/ticket-details.component";
import { TicketsFacade } from "../services";

xdescribe("Tickets Component", () => {
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

  const ticketsFacadeStub = {
    allTickets$: of(tickets),
    mutations$: of(false),
    selectTicketById() {},
    loadFilterTickets() {},
    loadTickets() {}
  };
  let ticketsFacade: TicketsFacade;
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [
          TicketsListComponent,
          TicketDetailsComponent,
          TicketsComponent
        ],
        imports: [
          BrowserAnimationsModule,
          RouterTestingModule,
          FormsModule,
          MaterialModule
        ],
        providers: [{ provide: TicketsFacade, useValue: ticketsFacadeStub }]
      }).compileComponents();

      ticketsFacade = TestBed.inject(TicketsFacade);
    })
  );

  it("should create the app", () => {
    const fixture = TestBed.createComponent(TicketsComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'ticket managing'`, () => {
    const fixture = TestBed.createComponent(TicketsComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual("ticket managing");
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
    const fixture = TestBed.createComponent(TicketsListComponent);
    const component = fixture.componentInstance;
    expect(component).toBeDefined();
  });

  it("should have TicketsListComponent render", () => {
    const fixture = TestBed.createComponent(TicketsComponent);
    fixture.detectChanges();
    const debugElements = fixture.debugElement.queryAll(
      By.directive(TicketsListComponent)
    );
    expect(debugElements.length).toEqual(1);
  });

  it(`should have ${tickets.length} tickets render`, () => {
    const fixture = TestBed.createComponent(TicketsComponent);
    //fixture.whenStable().then(() => {
    fixture.detectChanges();
    //fixture.componentInstance.loadTickets();
    const debugElements = fixture.debugElement.queryAll(
      By.css(".mat-list-text")
    );
    expect(debugElements.length).toEqual(tickets.length);
    //});
  });
});
