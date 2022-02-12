import { TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { render, screen, fireEvent } from '@testing-library/angular';
import { Ticket_vm } from 'src/app/models/model';

import { TicketsComponent } from './tickets.component';
import * as TicketsVmSelectors from "../../reducers/ticket-vm.selectors";
import * as TicketsSelectors from "../../reducers/ticket.selectors";
import { MaterialModule } from 'src/app/material.module';
import { RouterTestingModule } from '@angular/router/testing';
import { APP_BASE_HREF } from '@angular/common';
import { within } from '@testing-library/dom';
import { UtilService } from 'src/app/services';

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

const utilServiceStub = {
  generateTicketSearchForm(q) {},
};

const providers = [
  { provide: APP_BASE_HREF, useValue: '/'},
  { provide: UtilService, useValue: utilServiceStub },
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

describe('TicketsComponent', () => {
  it("should render the list", async () => {
    await render(TicketsComponent, {
        imports: [MaterialModule, RouterTestingModule],
        providers
    });

    const store = TestBed.inject(MockStore);
    store.dispatch = jest.fn();

    // const row = screen.getByRole('cell', {
    //   name: "Delete"
    // });

    // const btn = within(row).getByRole('button');
    // expect(screen.getAllByRole('button')[0]).toBeInTheDocument();
    // expect(screen.getAllByRole('button')[1]).toBeInTheDocument();
    expect(screen.getByRole('link', {name: 'Add New Ticket'})).toBeInTheDocument();
  });
})