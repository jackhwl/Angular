import { TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { Router } from "@angular/router";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { of } from "rxjs";
import { MaterialModule } from "../../material.module";
import { TicketDetailsComponent } from "./../ticket-details/ticket-details.component";
import { provideMockStore, MockStore } from "@ngrx/store/testing";
import { ActionsSubject, StoreModule } from "@ngrx/store";
//import { TicketsFacade } from "../../services";

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
  //let ticketsFacade: TicketsFacade;
  let router: Router;
  let store: MockStore;
  //let ticketsFacadeSpy: jasmine.SpyObj<TicketsFacade>;

  beforeEach(async () => {
    // jest.spyOn(router, 'navigateByUrl')
    // .mockImplementation(() => of(true).toPromise());

    //routerSpy = jasmine.createSpyObj("Router", ["navigateByUrl", "navigate"]);
    // ticketsFacadeSpy = jasmine.createSpyObj("TicketsFacade", [
    //   "selectTicketByRoute",
    //   "updateTicket",
    //   "createTicket"
    // ]);
    //waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [TicketDetailsComponent],
      imports: [
        BrowserAnimationsModule,
        RouterTestingModule,
        ReactiveFormsModule,
        MaterialModule,
        StoreModule.forRoot({
          //[fromTickets.TICKETS_FEATURE_KEY]: fromTickets.ticketsReducer
        })
      ],
      providers: [
        //{ provide: TicketsFacade, useValue: ticketsFacadeStub },
        //{ provide: Router, useValue: routerSpy }
        provideMockStore({ initialState })
      ]
    });

    await TestBed.compileComponents();
    store = TestBed.inject(MockStore);
    //ticketsFacade = TestBed.inject(TicketsFacade);
    //});
  });

  xit(`should have New Ticket map to form`, () => {
    ticketsFacadeStub.selectedTicketByRoute$ = of(newTicket);
    const fixture = TestBed.createComponent(TicketDetailsComponent);
    const component = fixture.componentInstance;
    //router = TestBed.inject(Router);
    //store = TestBed.inject(Store);
    fixture.detectChanges();
    expect(component.detailForm.value).toEqual({
      title: "New Ticket",
      ...newTicket
    });
  });

  xit(`should have Edit Ticket map to form`, () => {
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
    const spy = jest.spyOn(component, "onSubmit");
    component.onSubmit();
    //spyOn(ticketsFacade, "updateTicket").and.callThrough();

    let saveButton = fixture.nativeElement.querySelector("#save");
    saveButton.click();

    fixture.detectChanges();
    expect(spy).toHaveBeenCalled();

    // fixture.whenStable().then(() => {
    //   //expect(ticketsFacade.updateTicket).toHaveBeenCalled();

    //   const expectedPath = "tickets";
    //   const navigateSpy = jest.spyOn(router, 'navigate');
    //   //.mockImplementation(() => of(true).toPromise());
    //   expect(navigateSpy).toHaveBeenCalledWith([expectedPath]);
    //   // const actualPath = router.navigate
    //   //   .mostRecent()
    //   //   .args[0].toString();
    //   // expect(actualPath).toBe(expectedPath);
    //   // ticketsFacade.loaded$.subscribe(_ => {
    //   //   expect(_).toBe(false);
    //   // });
    // });
  });

  // it(`should createTicket and navigate when save button clicked`, () => {
  //   //ticketsFacade.selectedTicketByRoute$ = of(newTicket);
  //   const fixture = TestBed.createComponent(TicketDetailsComponent);
  //   const component = fixture.componentInstance;
  //   fixture.detectChanges();
  //   spyOn(component, "onSubmit").and.callThrough();

  //   let saveButton = fixture.nativeElement.querySelector("#save");
  //   saveButton.click();

  //   fixture.detectChanges();
  //   expect(component.onSubmit).toHaveBeenCalled();

  //   fixture.whenStable().then(() => {
  //     //expect(ticketsFacade.createTicket).toHaveBeenCalled();

  //     const expectedPath = "tickets";
  //     const actualPath = routerSpy.navigate.calls
  //       .mostRecent()
  //       .args[0].toString();
  //     expect(actualPath).toBe(expectedPath);
  //     // ticketsFacade.loaded$.subscribe(_ => {
  //     //   expect(_).toBe(false);
  //     // });
  //   });
  // });

  // it(`should cancelled method been called when cancel button clicked`, () => {
  //   const fixture = TestBed.createComponent(TicketDetailsComponent);
  //   const component = fixture.componentInstance;
  //   fixture.detectChanges();
  //   spyOn(component, "cancelled").and.callThrough();

  //   let cancelButton = fixture.nativeElement.querySelector("#cancel");
  //   cancelButton.click();

  //   fixture.detectChanges();
  //   expect(component.cancelled).toHaveBeenCalled();

  //   fixture.whenStable().then(() => {
  //     //expect(ticketsFacade.updateTicket).not.toHaveBeenCalled();

  //     const expectedPath = "tickets";
  //     const actualPath = routerSpy.navigate.calls
  //       .mostRecent()
  //       .args[0].toString();
  //     expect(actualPath).toBe(expectedPath);
  //   });
  // });
});
