import { flush, TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { FormBuilder } from "@angular/forms";
import { TicketDetailsComponent } from "./../ticket-details/ticket-details.component";
import { provideMockStore, MockStore } from "@ngrx/store/testing";
import { render, screen, fireEvent } from "@testing-library/angular";
import { UtilService } from "src/app/services";
import { Ticket_vm } from "src/app/models/model";
import * as TicketsVmSelectors from "../../reducers/ticket-vm.selectors";
import { TicketsComponentsModule } from "../ticketsComponentsModule";
import { of } from "rxjs";
import { By } from "@angular/platform-browser";
import userEvent from "@testing-library/user-event";
import { TicketDetailsPageActions } from "src/app/actions";
import { TestScheduler } from 'rxjs/testing';

const ticketVm: Ticket_vm = {
  id: '0',
  description: "Install a monitor arm",
  assigneeId: 111,
  completed: false,
  addresses: [
    {id: 'a1', ticketId: '0', addr1: '3050 del mar ave', addr2: null, postcode: '91770', phones: []},
    {id: 'a2', ticketId: '0', addr1: '4950 Yonge st', addr2: null, postcode: 'L3K 3M2', phones: []}
  ],
  assignees: [
    {id: 111, name: 'Victor'},
    {id: 222, name: 'Jack'}
  ],
  title: 'Edit Ticket'
};
// const initialState = {
//   users: {
//     ids: [111,222],
//     entities: {
//       111: {
//         id: 111, name: 'Victor'
//       },
//       222: {
//         id: 222, name: 'Jack'
//       }
//     }
//   },
//   tickets: {
//     ids: ['0'],
//     entities: {
//       0: {
//         id: '0',
//         description: "Install a monitor arm",
//         assigneeId: 111,
//         completed: false
//       }
//     },
//     error: null,
//     loaded: true,
//     selectedId: '0'
//   }
// };
// const providers = [
//   //{ provide: APP_BASE_HREF, useValue: '/' },
//   provideMockStore({ 
//     initialState,
//     selectors: [{
//         selector: TicketsVmSelectors.getSelectedTicketVmByRoute,
//         value: ticket
//       }
//     ]
//   })
// ]
let service: UtilService = new UtilService(new FormBuilder());

describe('TicketDetailsComponent', () => {
  const testScheduler = new TestScheduler((actual, expected) => {
    // asserting the two objects are equal - required
    // for TestScheduler assertions to work via your test framework
    // e.g. using chai.
    expect(actual).toEqual(expected);
  });

  async function setup(ticket: Ticket_vm) {
    const container = await render(TicketDetailsComponent, {
      excludeComponentDeclaration: true,
      imports: [TicketsComponentsModule, RouterTestingModule],
      providers: [
        { provide: UtilService, useValue: service}, 
        provideMockStore({ 
          selectors: [{
              selector: TicketsVmSelectors.getSelectedTicketVmByRoute,
              value: ticket
            }
          ]
        })
      ],
      componentProperties: { 
        detailForm$: of(service.generateTicketForm(ticket)),
        ticketId: ticket.id
      }
    });

    const store = TestBed.inject(MockStore);
    store.dispatch = jest.fn();
    return { container, dispatchSpy: store.dispatch, scannedActions$: store.scannedActions$ };
  }

  it("should dispatch TicketDetailsPageActions.opened() action", async () => {
    const { container, dispatchSpy } = await setup(ticketVm);
    const component = container.fixture.componentInstance;
    component.ngOnInit();

    expect(dispatchSpy).toHaveBeenCalledTimes(1);
    expect(dispatchSpy).toHaveBeenCalledWith(TicketDetailsPageActions.opened());
  });

  it("should scanned TicketDetailsPageActions.opened() action", async () => {
    testScheduler.run(async (helpers) => {
      const { cold, time, expectObservable, expectSubscriptions } = helpers;
      const { container, scannedActions$ } = await setup(ticketVm);
      const component = container.fixture.componentInstance;
      component.ngOnInit();
      
      const expected = cold('a', {a: TicketDetailsPageActions.opened()})
      expect(scannedActions$).toBe(expected)
    });
  });

  it("should render the ticket detail", async () => {
    await setup(ticketVm);

    expect(await screen.findByLabelText(/not finished/i)).toBeChecked()
    expect(await screen.findByText(ticketVm.assignees[0].name)).toBeInTheDocument();

    expect(screen.getByRole('textbox', { name: /description/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /description/i })).toHaveValue(ticketVm.description);

    expect(screen.getByRole('button', { name: /add address/i })).toBeInTheDocument();

    expect(screen.getByRole('button', { name: /save/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /remove/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /cancel/i })).toBeInTheDocument();

  });

  it("should render addresses component", async () => {
    const { container } = await setup(ticketVm);
    const { debugElement } = container.fixture;
    const childComponent = debugElement.query(By.css('vi-address'));
    expect(childComponent).toBeTruthy();
    const childComponents = debugElement.queryAll(By.css('vi-address'));
    expect(childComponents).toHaveLength(ticketVm.addresses.length);
  });

  it('should remove an address component after delete address event emit', async () => {
    const { container } = await setup(ticketVm);
    const { debugElement } = container.fixture;
    const childComponent = debugElement.query(By.css('vi-address'));    
    childComponent.triggerEventHandler('deleteAddress', 0)
    container.fixture.detectChanges();
    const childComponents = debugElement.queryAll(By.css('vi-address'));
    expect(childComponents).toHaveLength(ticketVm.addresses.length-1);
  });

  it('should add an address component after add address button clicked', async () => {
    const { container } = await setup(ticketVm);
    const { debugElement } = container.fixture;
    const btn = screen.getByRole('button', { name: /add address/i });
    userEvent.click(btn)
    const childComponents = debugElement.queryAll(By.css('vi-address'));
    expect(childComponents).toHaveLength(ticketVm.addresses.length+1);
  });

  it("should dispatch deleteTicket action after delete ticket button click", async () => {
    const { container, dispatchSpy } = await setup(ticketVm);
    const btn = screen.getByRole('button', { name: /remove/i });
    userEvent.click(btn)

    expect(dispatchSpy).toHaveBeenCalledWith(TicketDetailsPageActions.deleteTicketVm({ticketVm}));
    //flush();
    //container.fixture.detectChanges();
    //expect(location).toBe('/tickets')
  });
  
  it("should dispatch upsertTicketVm action after submit button click", async () => {
    const { container, dispatchSpy } = await setup(ticketVm);
    const btn = screen.getByRole('button', { name: /save/i });
    userEvent.click(btn)

    expect(dispatchSpy).toHaveBeenCalledWith(TicketDetailsPageActions.upsertTicketVm({ticketVm}));
  });
    
  xit("should navigate to list page after cancel button click", async () => {
    const { container } = await setup(ticketVm);
    const btn = screen.getByRole('button', { name: /cancel/i });
    userEvent.click(btn)
    container.fixture.detectChanges();
    expect(location).toBe('/tickets')
  });
});


// describe("Ticket Details Component", () => {
//   const ticket = {
//     id: 0,
//     description: "Install a monitor arm",
//     assigneeId: 111,
//     completed: false
//   };
//   const newTicket = {
//     id: null,
//     description: "aaa",
//     assigneeId: 222,
//     completed: false
//   };
//   const utilServiceStub = {
//     generateTicketForm(ticket) {},
//   };
//   const initialState = {
//     tickets: {
//       ids: [0, 1],
//       entities: {
//         0: {
//           id: 0,
//           description: "Install a monitor arm",
//           assigneeId: 111,
//           completed: false
//         },
//         1: {
//           id: 1,
//           description: "Move the desk to the new location",
//           assigneeId: 111,
//           completed: false
//         }
//       },
//       error: null,
//       loaded: false,
//       selectedId: null
//     }
//   };
//   //let ticketsFacade: TicketsFacade;
//   let router: Router;
//   let store: MockStore;
//   let service: UtilService;
//   let cfg = {
//     declarations: [TicketDetailsComponent],
//     imports: [
//       BrowserAnimationsModule,
//       RouterTestingModule,
//       ReactiveFormsModule,
//       MaterialModule,
//       StoreModule.forRoot({
//         //[fromTickets.TICKETS_FEATURE_KEY]: fromTickets.ticketsReducer
//       })
//     ],
//     providers: [
//       { provide: UtilService, useValue: utilServiceStub },
//       //{ provide: Router, useValue: routerSpy }
//       provideMockStore({ initialState })
//     ]
//   }
//   //let ticketsFacadeSpy: jasmine.SpyObj<TicketsFacade>;

//   beforeEach(async () => {
//     // jest.spyOn(router, 'navigateByUrl')
//     // .mockImplementation(() => of(true).toPromise());

//     //routerSpy = jasmine.createSpyObj("Router", ["navigateByUrl", "navigate"]);
//     // ticketsFacadeSpy = jasmine.createSpyObj("TicketsFacade", [
//     //   "selectTicketByRoute",
//     //   "updateTicket",
//     //   "createTicket"
//     // ]);
//     //waitForAsync(() => {
//     //TestBed.configureTestingModule(cfg);

//     //await TestBed.compileComponents();
//     await render(TicketDetailsComponent, cfg)
//     store = TestBed.inject(MockStore);
//     //ticketsFacade = TestBed.inject(TicketsFacade);
//     //});
//   });

//   // it(`should have New Ticket map to form`, () => {
//   //   const fixture = TestBed.createComponent(TicketDetailsComponent);
//   //   const component = fixture.componentInstance;
//   //   component.selectedTicketByRoute$ = of(newTicket);
//   //   fixture.detectChanges();

//   //   expect(component.detailForm.value).toEqual({
//   //     title: "New Ticket",
//   //     ...newTicket
//   //   });
//   // });

//   // it(`should have Edit Ticket map to form`, () => {
//   //   const fixture = TestBed.createComponent(TicketDetailsComponent);
//   //   const component = fixture.componentInstance;
//   //   component.selectedTicketByRoute$ = of(ticket);
//   //   fixture.detectChanges();
//   //   expect(component.detailForm.value).toEqual({
//   //     title: "Edit Ticket",
//   //     ...ticket
//   //   });
//   // });

//   it(`should call onSubmit and upsertTicket when form is submit`, async () => {

//     // const fixture = TestBed.createComponent(TicketDetailsComponent);

//     // const component = fixture.componentInstance;

//     // fixture.detectChanges();

    
//     //const submitSpy = jest.spyOn(component, "onSubmit");
//     //const updateSpy = jest.spyOn(component, "upsertTicket");
//     const form = screen.getByTestId("form");
//     console.log(form)
//     fireEvent.submit(form);

//     //expect(submitSpy).toHaveBeenCalled();
//     //expect(updateSpy).toHaveBeenCalled();
//   });

//   xit(`should updateTicket and navigate when save button clicked`, async () => {
//     const fixture = TestBed.createComponent(TicketDetailsComponent);
//     const component = fixture.componentInstance;
//     fixture.detectChanges();
//     const submitSpy = jest.spyOn(component, "onSubmit");

//     let saveButton = screen.getByText(/Save/i);
//     saveButton.click();

//     setTimeout(() => expect(submitSpy).toHaveBeenCalled());
//     //await expect(submitSpy).toHaveBeenCalled();

//     // fixture.whenStable().then(() => {
//     //   //expect(ticketsFacade.updateTicket).toHaveBeenCalled();

//     //   const expectedPath = "tickets";
//     //   const navigateSpy = jest.spyOn(router, 'navigate');
//     //   //.mockImplementation(() => of(true).toPromise());
//     //   expect(navigateSpy).toHaveBeenCalledWith([expectedPath]);
//     //   // const actualPath = router.navigate
//     //   //   .mostRecent()
//     //   //   .args[0].toString();
//     //   // expect(actualPath).toBe(expectedPath);
//     //   // ticketsFacade.loaded$.subscribe(_ => {
//     //   //   expect(_).toBe(false);
//     //   // });
//     // });
//   });

//   // it(`should createTicket and navigate when save button clicked`, () => {
//   //   //ticketsFacade.selectedTicketByRoute$ = of(newTicket);
//   //   const fixture = TestBed.createComponent(TicketDetailsComponent);
//   //   const component = fixture.componentInstance;
//   //   fixture.detectChanges();
//   //   spyOn(component, "onSubmit").and.callThrough();

//   //   let saveButton = fixture.nativeElement.querySelector("#save");
//   //   saveButton.click();

//   //   fixture.detectChanges();
//   //   expect(component.onSubmit).toHaveBeenCalled();

//   //   fixture.whenStable().then(() => {
//   //     //expect(ticketsFacade.createTicket).toHaveBeenCalled();

//   //     const expectedPath = "tickets";
//   //     const actualPath = routerSpy.navigate.calls
//   //       .mostRecent()
//   //       .args[0].toString();
//   //     expect(actualPath).toBe(expectedPath);
//   //     // ticketsFacade.loaded$.subscribe(_ => {
//   //     //   expect(_).toBe(false);
//   //     // });
//   //   });
//   // });

//   xit(`should cancelled method been called when cancel button clicked`, () => {
//     const fixture = TestBed.createComponent(TicketDetailsComponent);
//     const component = fixture.componentInstance;
//     fixture.detectChanges();
//     const cancelSpy = jest.spyOn(component, "cancelled");
//     //const updateSpy = jest.spyOn(component, "updateTicket");

//     const cancelButton = screen.getByText(/cancel/i);
//     fireEvent.click(cancelButton);

//     fixture.detectChanges();
//     expect(cancelSpy).toHaveBeenCalled();
//     //expect(updateSpy).not.toHaveBeenCalled();

//     // fixture.whenStable().then(() => {
//     //   //expect(ticketsFacade.updateTicket).not.toHaveBeenCalled();

//     //   const expectedPath = "tickets";
//     //   const actualPath = routerSpy.navigate.calls
//     //     .mostRecent()
//     //     .args[0].toString();
//     //   expect(actualPath).toBe(expectedPath);
//     // });
//   });
// });
