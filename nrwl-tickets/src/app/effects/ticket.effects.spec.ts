import { ActionsSubject, Action } from '@ngrx/store';
import { TicketEffects } from './ticket.effects';
import { TicketService } from '../services/ticket.service';
import { TicketApiActions, TicketActions } from '../actions';
import { Ticket } from '../models/model';
import { Observable, of, Subject } from "rxjs";
import { subscribeSpyTo, fakeTime } from '@hirez_io/observer-spy';
import { getMockStore } from '@ngrx/store/testing';
import { createMock, createMockWithValues } from '@testing-library/angular/jest-utils';
import { Router, RouterEvent } from '@angular/router';
import { selectRouteParams } from '../reducers/router.selectors';

it('update ticket dispatches a success action (using observe-spy)', fakeTime( flush => {
    const { service } = setup();
    const actions = new ActionsSubject();
    const routerEvents = new Subject<RouterEvent>();
    const router = createMockWithValues(Router, {
        events: routerEvents,
    });
    const effects = new TicketEffects(getMockStore({
        selectors: [{ selector: selectRouteParams, value: ['a'] }],
    }), actions,  service, router);

    const observerSpy = subscribeSpyTo(effects.upsertTicket$)

    const action = TicketActions.upsertTicket({ticket: newTickets()[0]})
    actions.next(action)
    flush()

    expect(observerSpy.getValues()).toEqual([TicketApiActions.upsertTicketSuccess({ ticket: newTickets()[0] })])
}))

function setup() {
    const service = createMockWithValues(TicketService, {
        upsert: () => of(newTickets()[0]),
    });

    return {service}
}

function newTickets(): Ticket[] { 
    return [{
      id: 'f2ff9752-217e-4ee3-ab25-6f842132d42f',
      description: "Install a monitor arm",
      assigneeId: 111,
      completed: false,
      addressIds: []
    },
    {
      id: '774c5999-5031-402d-bd4c-588d933dda20',
      description: "Move the desk to the new location",
      assigneeId: 222,
      completed: false,
      addressIds: []
    }
  ];
}