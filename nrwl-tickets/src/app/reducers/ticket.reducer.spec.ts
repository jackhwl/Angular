import { TicketApiActions } from "../actions"
import { initialState, reducer } from "./ticket.reducer"
import { Ticket } from "../models/model";

it('TicketApiActions.loadTicketSuccess should set load to true ', () => {
    const ticket: Ticket = {
        id: 't1',
        description: "new ticket",
        assigneeId: 111,
        completed: false,
        addressIds: []
      };
    const newState = {
        ids: ['t1'],
        entities: {
            't1': ticket,
        },
        loaded: true, 
        error: null,
        selectedId: 't1'
    }
    expect(reducer(initialState, TicketApiActions.loadTicketSuccess({ticket}))).toEqual(newState)
})

it('TicketApiActions.loadTicketFailure should set error value ', () => {
    const error = 'something wrong'
    const newState = {
        ids: [],
        entities: { },
        loaded: false,
        error
    }
    expect(reducer(initialState, TicketApiActions.loadTicketFailure({error}))).toEqual(newState)
})

it('TicketApiActions.loadFilterTicketsSuccess should set load to true ', () => {
    const tickets: Ticket[] = [
        {
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

    const newState = {
        ids: ['f2ff9752-217e-4ee3-ab25-6f842132d42f', '774c5999-5031-402d-bd4c-588d933dda20'],
        entities: {
            'f2ff9752-217e-4ee3-ab25-6f842132d42f': tickets[0],
            '774c5999-5031-402d-bd4c-588d933dda20': tickets[1]
        },
        loaded: true, 
        error: null
    }
    expect(reducer(initialState, TicketApiActions.loadFilterTicketsSuccess({tickets}))).toEqual(newState)
})

it('TicketApiActions.loadFilterTicketsFailure should set error value ', () => {
    const error = 'something wrong'
    const newState = {
        ids: [],
        entities: { },
        loaded: false,
        error
    }
    expect(reducer(initialState, TicketApiActions.loadFilterTicketsFailure({error}))).toEqual(newState)
})

it('TicketApiActions.upsertTicketSuccess should set load to true ', () => {
    const ticket: Ticket = {
        id: 't1',
        description: "new ticket",
        assigneeId: 111,
        completed: false,
        addressIds: []
      };
    const newState = {
        ids: ['t1'],
        entities: {
            't1': ticket,
        },
        loaded: true, 
        error: null
    }
    expect(reducer(initialState, TicketApiActions.upsertTicketSuccess({ticket}))).toEqual(newState)
})

it('TicketApiActions.upsertTicketFailure should set error value ', () => {
    const error = 'something wrong'
    const newState = {
        ids: [],
        entities: { },
        loaded: false,
        error
    }
    expect(reducer(initialState, TicketApiActions.upsertTicketFailure({error}))).toEqual(newState)
})

it('TicketApiActions.updateAddressesSuccess should set load to true ', () => {
    const ticket0: Ticket = {
        id: 't1',
        description: "new ticket",
        assigneeId: 111,
        completed: false,
        addressIds: []
      };
      const ticket1: Ticket = {
        id: 't1',
        description: "new ticket",
        assigneeId: 111,
        completed: false,
        addressIds: ['a1','a2']
      };
    const newState = {
        ids: ['t1'],
        entities: {
            't1': ticket1,
        },
        loaded: true, 
        error: null,
        selectedId: 't1'
    }
    const ticket = {id: ticket0.id, changes: {addressIds: ticket1.addressIds}}
    const prevState = reducer(initialState, TicketApiActions.loadTicketSuccess({ticket: ticket0}))
    expect(reducer(prevState, TicketApiActions.updateAddressesSuccess({ticket}))).toEqual(newState)
})

it('TicketApiActions.deleteTicketSuccess should set load to true ', () => {
    const id = 'f2ff9752-217e-4ee3-ab25-6f842132d42f';
    const tickets: Ticket[] = [
        {
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

    const newState = {
        ids: ['774c5999-5031-402d-bd4c-588d933dda20'],
        entities: {
            '774c5999-5031-402d-bd4c-588d933dda20': tickets[1]
        },
        loaded: true, 
        error: null
    }
    const prevState = reducer(initialState, TicketApiActions.loadFilterTicketsSuccess({tickets}))
    expect(reducer(prevState, TicketApiActions.deleteTicketSuccess({id}))).toEqual(newState)
})

it('TicketApiActions.deleteTicketFailure should set error value ', () => {
    const error = 'something wrong'
    const newState = {
        ids: [],
        entities: { },
        loaded: false,
        error
    }
    expect(reducer(initialState, TicketApiActions.deleteTicketFailure({error}))).toEqual(newState)
})

