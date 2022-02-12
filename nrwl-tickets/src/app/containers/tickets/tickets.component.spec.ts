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
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';

const initialState = {
  tickets: {
    ids: ['0', '1'],
    entities: {
      0: {
        id: '0',
        description: "Install a monitor arm",
        assigneeId: 111,
        completed: false
      },
      1: {
        id: '1',
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
const utilServiceStub = {
  generateTicketSearchForm(q) {},
};

const providers = [
  {provide: APP_BASE_HREF, useValue: '/'},
  provideMockStore({ 
    initialState
  })
]

describe('TicketsComponent', () => {
  // let component: TicketsComponent;
  // let store = provideMockStore({ initialState })[0]
  // ;
  // let fb: FormBuilder;
  // let service: UtilService = new UtilService(fb);

  // beforeEach(() => {
  //   component = new TicketsComponent(store, service);
  // })

  it("should render the list", async () => {
    const component = await render(TicketsComponent, {
      imports: [MaterialModule, RouterTestingModule],
      providers
  });
    expect(component).toBe('')

  });
})