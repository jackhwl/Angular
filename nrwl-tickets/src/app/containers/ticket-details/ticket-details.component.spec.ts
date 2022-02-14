import { TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { FormBuilder, ReactiveFormsModule } from "@angular/forms";
import { Router } from "@angular/router";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { of } from "rxjs";
import { MaterialModule } from "../../material.module";
import { TicketDetailsComponent } from "./../ticket-details/ticket-details.component";
import { provideMockStore, MockStore } from "@ngrx/store/testing";
import { ActionsSubject, StoreModule } from "@ngrx/store";
//import { TicketsFacade } from "../../services";
import { render, screen, fireEvent } from "@testing-library/angular";
import { UtilService } from "src/app/services";
import { Ticket_vm } from "src/app/models/model";
import * as TicketsVmSelectors from "../../reducers/ticket-vm.selectors";

const ticket: Ticket_vm = {
  id: '0',
  description: "Install a monitor arm",
  assigneeId: 111,
  completed: false,
  addresses: [],
  assignees: []
};
const initialState = {
  tickets: {
    ids: ['0'],
    entities: {
      0: {
        id: '0',
        description: "Install a monitor arm",
        assigneeId: 111,
        completed: false
      }
    },
    error: null,
    loaded: true,
    selectedId: '0'
  }
};
const providers = [
  //{ provide: APP_BASE_HREF, useValue: '/' },
  provideMockStore({ 
    initialState,
    selectors: [{
        selector: TicketsVmSelectors.getSelectedTicketVmByRoute,
        value: ticket
      }
    ]
  })
]
let service: UtilService = new UtilService(new FormBuilder());

describe('TicketDetailsComponent', () => {
  async function setup(ticket: Ticket_vm) {
    await render(TicketDetailsComponent, {
      imports: [MaterialModule, ReactiveFormsModule, RouterTestingModule],
      providers: [
        { provide: UtilService, useValue: service}, 
        provideMockStore({ 
          selectors: [{
              selector: TicketsVmSelectors.getSelectedTicketVmByRoute,
              value: ticket
            }
          ]
        })
      ]
    });

    const store = TestBed.inject(MockStore);
    store.dispatch = jest.fn();
    return { dispatchSpy: store.dispatch };
  }

  it("should render the ticket detail", async () => {
    await setup(ticket);

    expect(screen.getByRole('textbox', { name: /description/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /description/i })).toHaveValue(ticket.description);

    expect(screen.getByRole('button', { name: /add address/i })).toBeInTheDocument();

    expect(screen.getByRole('button', { name: /save/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /remove/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /cancel/i })).toBeInTheDocument();

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
