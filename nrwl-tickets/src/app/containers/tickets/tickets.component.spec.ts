import { TestBed, tick } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event'
import * as TicketsSelectors from "../../reducers/ticket.selectors";
import * as TicketsVmSelectors from "../../reducers/ticket-vm.selectors";
import { RouterTestingModule } from '@angular/router/testing';
import { TicketListPageActions } from 'src/app/actions';
import { TicketsComponentsModule } from '../ticketsComponentsModule';
import { TicketsComponent } from './tickets.component';
import { UtilService } from 'src/app/services';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { selectQueryParam } from 'src/app/reducers/router.selectors';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { routes } from 'src/app/tickets-routing.module';

import { cold } from 'jasmine-marbles';
import { Ticket_vm } from 'src/app/models/model';

let service: UtilService = new UtilService(new FormBuilder());
const tickets: Ticket_vm[] = [{
  id: '0',
  description: "Install a monitor arm",
  assigneeId: 111,
  completed: false,
  addresses: [],
  assignees: []
  },
   {
  id: '1',
  description: "aaa",
  assigneeId: 222,
  completed: false,
  addresses: [],
  assignees: []
}];

describe('TicketsComponent', () => {
  afterEach(() => {
    jest.useRealTimers();
  });

  async function setup(q: string, id: string = undefined, loaded = true) {
    const container = await render(TicketsComponent, {
      imports: [TicketsComponentsModule, ReactiveFormsModule, RouterTestingModule.withRoutes(routes[0].children)],
      providers: [
        { provide: UtilService, useValue: service },
        provideMockStore({
          selectors: [
            {
              selector: TicketsVmSelectors.getFilterTicketsVmByRoute,
              value: tickets
            },
            {
              selector: selectQueryParam('q'),
              value: q
            },
            {
              selector: TicketsSelectors.getLoaded,
              value: loaded
            }
          ]
        })
      ],
      componentProperties: {
        routerQueryParam$: of(q),
        routerRouteParamId$: of(id)
      }
    });
    jest.useFakeTimers();
    const router = TestBed.inject(Router);
    container.fixture.ngZone.run(() => router.initialNavigation());
    const store = TestBed.inject(MockStore);
    //store.dispatch = jest.fn();
    return { container, dispatchSpy: jest.fn(), store, router };
  }

  it("should render ticket component in list mode by default", async () => {
    await setup('');
    expect(screen.getByRole('link', { name: /add new ticket/i })).toHaveAttribute('href', '/new');
    expect(screen.getByRole('textbox', { name: /search/i })).toHaveValue('');
  });

  it("should render ticket component in edit mode if have id in url", async () => {
    await setup('', '0');
    expect(screen.queryByRole('link', { name: /add new ticket/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('textbox', { name: /search/i })).not.toBeInTheDocument();
  });

  it("should render ticket list component by default", async () => {
    const { container } = await setup('');
    const { debugElement } = container.fixture;

    const childComponent = debugElement.
    query(By.css('vi-ticket-list'));
    expect(childComponent).toBeTruthy();

    const childComponents = debugElement.queryAll(By.css('vi-ticket-list'));
    expect(childComponents).toHaveLength(1);
  });

  it("should dispatch TicketListPageActions.opened by default route", async () => {
    const { container, store } = await setup('');
    store.dispatch = jest.fn();
    const component = container.fixture.componentInstance;
    component.ngOnInit();
    container.fixture.detectChanges();

    expect(store.dispatch).toHaveBeenCalledWith(TicketListPageActions.opened());
  });

  it("should dispatch TicketListPageActions.filterParamChanged action after type in the search field ", async () => {
    const { container, store } = await setup('');
    store.dispatch = jest.fn();
    const component = container.fixture.componentInstance;
    component.ngOnInit();

    const q = 'Move'
    userEvent.type(screen.getByRole('textbox', { name: /search/i }), q);
    expect(screen.getByRole('textbox', { name: /search/i })).toHaveValue(q);
    jest.advanceTimersByTime(200);

    expect(store.dispatch).toHaveBeenCalledWith(TicketListPageActions.filterParamChanged({ q }));
  });

  it("should dispatch TicketListPageActions.filterParamChanged action after type in the search field (marble) ", async () => {
    const { container, store } = await setup('');
    const component = container.fixture.componentInstance;
    component.ngOnInit();

    const q = 'Move'
    userEvent.type(screen.getByRole('textbox', { name: /search/i }), q);
    expect(screen.getByRole('textbox', { name: /search/i })).toHaveValue(q);
    jest.advanceTimersByTime(210);

    const expected = cold('a', {a: TicketListPageActions.filterParamChanged({ q })})
    expect(store.scannedActions$).toBeObservable(expected)

  });
})

// describe('TicketsComponent', () => {
//   // let component: TicketsComponent;
//   // let store = provideMockStore({ initialState })[0]
//   // ;
//   // let fb: FormBuilder;
//   // let service: UtilService = new UtilService(fb);

//   // beforeEach(() => {
//   //   component = new TicketsComponent(store, service);
//   // })

//   it("should render the list", async () => {
//     const component = await render(TicketsComponent, {
//       imports: [TicketsComponentsModule],
//       providers
//     });
//     userEvent.click(screen.getByRole('link'))
//     expect(store.dispatch).toHaveBeenCalledWith(TicketActions.deleteTicket({id: '0'}));

//     expect(component).toBe('')

//   });
//})