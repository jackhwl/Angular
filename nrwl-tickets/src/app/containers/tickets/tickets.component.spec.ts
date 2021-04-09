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
import { TicketsListComponent } from "../../components/tickets-list/tickets-list.component";
import { TicketDetailsComponent } from "./../ticket-details/ticket-details.component";
import { TicketsFacade } from "../../services";

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

  const ticketsFacadeStub = {
    allTicketVms$: of(tickets),
    mutations$: of(false),
    selectTicketById() {},
    loadFilterTicketsByRoute() {},
    loadTickets() {},
    loadUsers() {}
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
          //FormsModule,
          ReactiveFormsModule,
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

  xit(`should have as title 'ticket managing'`, () => {
    const fixture = TestBed.createComponent(TicketsComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual("ticket managing");
  });

  xit("should have '/tickets/new' in 'Add New' link", () => {
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

  xit("should have TicketsListComponent render", () => {
    const fixture = TestBed.createComponent(TicketsComponent);
    fixture.detectChanges();
    const debugElements = fixture.debugElement.queryAll(
      By.directive(TicketsListComponent)
    );
    expect(debugElements.length).toEqual(1);
  });

  xit(`should have ${tickets.length} tickets render`, () => {
    const fixture = TestBed.createComponent(TicketsListComponent);
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const debugElements = fixture.debugElement.queryAll(
        By.css(".mat-list-text")
      );
      expect(debugElements.length).toEqual(tickets.length);
    });
  });

  xit(`should query method been called when query button clicked`, () => {
    const fixture = TestBed.createComponent(TicketsComponent);
    const component = fixture.componentInstance;
    //spyOn(component, "query");

    let button = fixture.debugElement.nativeElement.querySelector("button");
    button.click();

    //fixture.whenStable().then(() => {
    fixture.detectChanges();
    //expect(component.query).toHaveBeenCalled();

    //});
  });

  xit("should update the value in the control (333model to view)", () => {
    const fixture = TestBed.createComponent(TicketsComponent);
    //component.search.setValue("Move");

    //const input = fixture.debugElement.nativeElement.querySelector("input"); //fixture.debugElement.query(By.css('#abc')); //.querySelector('input[id="abc"]'); //fixture.debugElement.query(By.css('#abc')); //
    const input = fixture.debugElement.query(By.css("#cde"));
    //fixture.detectChanges();
    expect(input).not.toBe(null);
    // fixture.whenStable().then(() => {
    //   const input = fixture.debugElement.queryAll(
    //     By.css(".cde")
    //   );
    //   expect(input.length).toEqual(10);
    // });
  });
});
