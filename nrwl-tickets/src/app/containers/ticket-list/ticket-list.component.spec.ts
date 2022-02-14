import { TestBed, waitForAsync } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event'
import { Ticket_vm } from 'src/app/models/model';

import { TicketListComponent } from './ticket-list.component';
import * as TicketsVmSelectors from "../../reducers/ticket-vm.selectors";
import * as TicketsSelectors from "../../reducers/ticket.selectors";
import { MaterialModule } from 'src/app/material.module';
import { RouterTestingModule } from '@angular/router/testing';
import { TicketActions, TicketListPageActions } from 'src/app/actions';
import { TicketsComponentsModule } from '../ticketsComponentsModule';
import { cold } from 'jasmine-marbles';

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
const providers = [
  provideMockStore({ 
    initialState,
    selectors: [{
        selector: TicketsVmSelectors.getFilterTicketsVmByRoute,
        value: tickets
      },
      {
        selector: TicketsSelectors.getLoaded,
        value: true
      }
    ]
  })
]

describe('TicketListComponent', () => {
  async function setup(tickets: Ticket_vm[], loaded=true) {
    await render(TicketListComponent, {
      imports: [MaterialModule, RouterTestingModule],
      providers: [
        provideMockStore({ 
          selectors: [{
              selector: TicketsVmSelectors.getFilterTicketsVmByRoute,
              value: tickets
            },
            {
              selector: TicketsSelectors.getLoaded,
              value: loaded
            }
          ]
        })
      ]
    });

    const store = TestBed.inject(MockStore);
    store.dispatch = jest.fn();
    return { dispatchSpy: store.dispatch };
  }

  it("should render the list", async () => {
    await setup(tickets);

    //const store = TestBed.inject(MockStore);
    //store.dispatch = jest.fn();

    // const row = screen.getByRole('cell', {
    //   name: "Delete"
    // });

    // const btn = within(row).getByRole('button');
    expect(screen.getAllByRole('button')[0]).toBeInTheDocument();
    expect(screen.getAllByRole('button')[1]).toBeInTheDocument();

    expect(screen.getAllByRole('link')).toHaveLength(tickets.length);

    // const btn = screen.getByRole('button', {
    //   name: /install a monitor arm/i
    // });
    // userEvent.click(btn)
    //userEvent.click(screen.getByRole('button', {: '0'}))
    //expect(store.dispatch).toHaveBeenCalledWith(TicketActions.deleteTicket({id: '0'}));
  });

  it("should dispatch deleteTicket action after delete button click", async () => {
    const tickets2: Ticket_vm[] = [{
      id: '111',
      description: "Install a monitor arm",
      assigneeId: 3,
      completed: false,
      addresses: [],
      assignees: []
      },
       {
      id: '222',
      description: "Debug rust program",
      assigneeId: 4,
      completed: false,
      addresses: [],
      assignees: []
    }];
    
    const { dispatchSpy } = await setup(tickets2);

    tickets2.forEach(ticket => {
      const btn = screen.getByRole('button', { name: ticket.description });

      userEvent.click(btn);
  
      expect(dispatchSpy).toHaveBeenCalledWith(TicketActions.deleteTicket({id: ticket.id}));
    })
  });

  it("should display loading when load state is false", async () => {
    const tickets2: Ticket_vm[] = [{
      id: '111',
      description: "Install a monitor arm",
      assigneeId: 3,
      completed: false,
      addresses: [],
      assignees: []
      },
       {
      id: '222',
      description: "Debug rust program",
      assigneeId: 4,
      completed: false,
      addresses: [],
      assignees: []
    }];
    
    await setup(tickets2, false);
    expect(screen.queryAllByRole('link')).toHaveLength(0);
    expect(screen.queryByText('Loading...')).toBeVisible();

  });
})

describe('TicketListComponent TestBed', () => {
  let store: MockStore;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [ TicketsComponentsModule ],
        providers
      }).compileComponents();

      store = TestBed.inject(MockStore);
      
    })
  );

  it("should dispatch TicketListPageActions.opened() action StoreModule+jasmine", () => {
    jest.spyOn(store, "dispatch");
    const fixture = TestBed.createComponent(TicketListComponent);
    const component = fixture.componentInstance;
    component.ngOnInit();
    
    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(TicketListPageActions.opened());


  });

  it("should dispatch TicketListPageActions.opened() action MockStore", () => {
    const fixture = TestBed.createComponent(TicketListComponent);
    const component = fixture.componentInstance;
    component.ngOnInit();
    
    const expected = cold('a', {a: TicketListPageActions.opened()})
    expect(store.scannedActions$).toBeObservable(expected)

    //fixture.detectChanges();
    // const row = screen.getByRole('row', {
    //   name: /0/i
    // });
    
    // const btn = screen.getByRole('button', {
    //   name: /install a monitor arm/i
    // });
    // userEvent.click(btn)
    // expect(store.dispatch).toHaveBeenCalledWith(TicketActions.deleteTicket({id: '0'}));

  });
})