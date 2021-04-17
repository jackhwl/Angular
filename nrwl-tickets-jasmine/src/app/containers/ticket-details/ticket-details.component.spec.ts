import { TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { Router } from "@angular/router";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { of } from "rxjs";
import { MaterialModule } from "../../material.module";
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
    description: "aaa",
    assigneeId: 222,
    completed: false
  };
  const ticketsFacadeStub = {
    selectedTicketByRoute$: of(ticket),
    selectTicketByRoute() {},
    updateTicket(ticket) {},
    createTicket(ticket) {}
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
        ReactiveFormsModule,
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

  it(`should have New Ticket map to form`, () => {
    ticketsFacadeStub.selectedTicketByRoute$ = of(newTicket);
    const fixture = TestBed.createComponent(TicketDetailsComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component.detailForm.value).toEqual({
      title: "New Ticket",
      ...newTicket
    });
  });

  it(`should have Edit Ticket map to form`, () => {
    ticketsFacadeStub.selectedTicketByRoute$ = of(ticket);
    const fixture = TestBed.createComponent(TicketDetailsComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component.detailForm.value).toEqual({
      title: "Edit Ticket",
      ...ticket
    });
  });

  it(`should updateTicket and navigate when save button clicked`, () => {
    const fixture = TestBed.createComponent(TicketDetailsComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();
    spyOn(component, "onSubmit").and.callThrough();
    spyOn(ticketsFacade, "updateTicket").and.callThrough();

    let saveButton = fixture.nativeElement.querySelector("#save");
    saveButton.click();

    fixture.detectChanges();
    expect(component.onSubmit).toHaveBeenCalled();

    fixture.whenStable().then(() => {
      expect(ticketsFacade.updateTicket).toHaveBeenCalled();

      const expectedPath = "tickets";
      const actualPath = routerSpy.navigate.calls
        .mostRecent()
        .args[0].toString();
      expect(actualPath).toBe(expectedPath);
      ticketsFacade.loaded$.subscribe(_ => {
        expect(_).toBe(false);
      });
    });
  });

  it(`should createTicket and navigate when save button clicked`, () => {
    ticketsFacade.selectedTicketByRoute$ = of(newTicket);
    const fixture = TestBed.createComponent(TicketDetailsComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();
    spyOn(component, "onSubmit").and.callThrough();

    let saveButton = fixture.nativeElement.querySelector("#save");
    saveButton.click();

    fixture.detectChanges();
    expect(component.onSubmit).toHaveBeenCalled();

    fixture.whenStable().then(() => {
      expect(ticketsFacade.createTicket).toHaveBeenCalled();

      const expectedPath = "tickets";
      const actualPath = routerSpy.navigate.calls
        .mostRecent()
        .args[0].toString();
      expect(actualPath).toBe(expectedPath);
      ticketsFacade.loaded$.subscribe(_ => {
        expect(_).toBe(false);
      });
    });
  });

  it(`should cancelled method been called when cancel button clicked`, () => {
    const fixture = TestBed.createComponent(TicketDetailsComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();
    spyOn(component, "cancelled").and.callThrough();

    let cancelButton = fixture.nativeElement.querySelector("#cancel");
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
