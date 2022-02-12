import { TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { render, screen, fireEvent } from '@testing-library/angular';
import { Ticket_vm } from 'src/app/models/model';

import { TicketListComponent } from './ticket-list.component';
import * as TicketsVmSelectors from "../../reducers/ticket-vm.selectors";
import * as TicketsSelectors from "../../reducers/ticket.selectors";
import { MaterialModule } from 'src/app/material.module';
import { RouterTestingModule } from '@angular/router/testing';
import { APP_BASE_HREF } from '@angular/common';
import { within } from '@testing-library/dom';

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

const providers = [
  {provide: APP_BASE_HREF, useValue: '/'},
  provideMockStore({ 
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
  it("should render the list", async () => {
    await render(TicketListComponent, {
        imports: [MaterialModule, RouterTestingModule],
        providers
    });

    const store = TestBed.inject(MockStore);
    store.dispatch = jest.fn();

    // const row = screen.getByRole('cell', {
    //   name: "Delete"
    // });

    // const btn = within(row).getByRole('button');
    expect(screen.getAllByRole('button')[0]).toBeInTheDocument();
    expect(screen.getAllByRole('button')[1]).toBeInTheDocument();
    expect(screen.getAllByRole('link')).toHaveLength(tickets.length);
  });
})