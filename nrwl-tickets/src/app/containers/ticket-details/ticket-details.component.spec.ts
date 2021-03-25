import {
  fakeAsync,
  inject,
  TestBed,
  tick,
  waitForAsync
} from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { FormsModule } from "@angular/forms";
import { By } from "@angular/platform-browser";
import { Router, RouterLinkWithHref } from "@angular/router";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { of } from "rxjs";
import { MaterialModule } from "../../material.module";
//import { TicketsComponent } from "./tickets.component";
//import { TicketsListComponent } from "../../components/tickets-list/tickets-list.component";
import { TicketDetailsComponent } from "./../ticket-details/ticket-details.component";
import { TicketsFacade } from "../../services";

describe("Ticket Details Component", () => {
  const ticket = {
    id: 0,
    description: "Install a monitor arm",
    assigneeId: 111,
    completed: false
  };
  const newTicket = {
    id: null,
    description: "",
    assigneeId: null,
    completed: false
  };
  const ticketsFacadeStub = {
    selectedTicketByRoute$: of(ticket),
    selectTicketByRoute() {},
    updateTicket(_) {},
    createTicket(_) {}
  };
  let ticketsFacade: TicketsFacade;
  let routerSpy: jasmine.SpyObj<Router>;
  let ticketsFacadeSpy: jasmine.SpyObj<TicketsFacade>;

  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj("Router", ["navigateByUrl", "navigate"]);
    ticketsFacadeSpy = jasmine.createSpyObj("TicketsFacade", [
      "selectTicketByRoute",
      "updateTicket",
      "createTicket"
    ]);
    //waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [TicketDetailsComponent],
      imports: [
        BrowserAnimationsModule,
        RouterTestingModule,
        FormsModule,
        MaterialModule
      ],
      providers: [
        { provide: TicketsFacade, useValue: ticketsFacadeStub },
        { provide: Router, useValue: routerSpy }
      ]
    });

    await TestBed.compileComponents();
    ticketsFacade = TestBed.inject(TicketsFacade);
    //});
  });

  it(`should have currentTicket assigned`, () => {
    //spyOnProperty(ticketsFacade, "selectedTicketByRoute$", "get").and.returnValue(of(ticket));
    const fixture = TestBed.createComponent(TicketDetailsComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component.currentTicket).toEqual(ticket);
  });

  it(`should updateTicket and navigate when save button clicked`, () => {
    const fixture = TestBed.createComponent(TicketDetailsComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();
    spyOn(component, "saved").and.callThrough();

    let saveButton = fixture.debugElement.nativeElement.querySelector("#save");
    saveButton.click();

    fixture.detectChanges();
    expect(component.saved).toHaveBeenCalled();

    fixture.whenStable().then(() => {
      expect(ticketsFacade.updateTicket).toHaveBeenCalled();

      const expectedPath = "tickets";
      const actualPath = routerSpy.navigate.calls
        .mostRecent()
        .args[0].toString();
      expect(actualPath).toBe(expectedPath);
    });
  });

  it(`should createTicket and navigate when save button clicked`, () => {
    ticketsFacade.selectedTicketByRoute$ = of(newTicket);
    const fixture = TestBed.createComponent(TicketDetailsComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();
    spyOn(component, "saved").and.callThrough();

    let saveButton = fixture.debugElement.nativeElement.querySelector("#save");
    saveButton.click();

    fixture.detectChanges();
    expect(component.saved).toHaveBeenCalled();

    fixture.whenStable().then(() => {
      expect(ticketsFacade.createTicket).toHaveBeenCalled();

      const expectedPath = "tickets";
      const actualPath = routerSpy.navigate.calls
        .mostRecent()
        .args[0].toString();
      expect(actualPath).toBe(expectedPath);
    });
  });

  it(`should cancelled method been called when cancel button clicked`, () => {
    const fixture = TestBed.createComponent(TicketDetailsComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();
    spyOn(component, "cancelled").and.callThrough();

    let cancelButton = fixture.debugElement.nativeElement.querySelector(
      "#cancel"
    );
    cancelButton.click();

    fixture.detectChanges();
    expect(component.cancelled).toHaveBeenCalled();

    fixture.whenStable().then(() => {
      expect(ticketsFacade.updateTicket).not.toHaveBeenCalled();

      const expectedPath = "tickets";
      const actualPath = routerSpy.navigate.calls
        .mostRecent()
        .args[0].toString();
      expect(actualPath).toBe(expectedPath);
    });
  });
});
