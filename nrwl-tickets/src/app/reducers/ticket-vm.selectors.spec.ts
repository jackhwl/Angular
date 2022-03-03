import { Ticket, Ticket_vm, User } from '../models/model';
import { getFilterTicketsVmByRoute } from './ticket-vm.selectors'

const tickets: Ticket[] = [{
    id: '0',
    description: "Install a monitor arm",
    assigneeId: 111,
    completed: false,
    addressIds: [],
    },
     {
    id: '1',
    description: "Move the desk to the new location",
    assigneeId: 222,
    completed: false,
    addressIds: [],
  }];

const users: User[] = [
    { id: 111, name: "Victor" },
    { id: 222, name: "Jack" }
  ];

const tickets_vm: Ticket_vm[] = [{
    id: '0',
    description: "Install a monitor arm",
    assigneeId: 111,
    completed: false,
    addresses: [],
    assignees: [{ id: 111, name: "Victor" }]
    },
     {
    id: '1',
    description: "Move the desk to the new location",
    assigneeId: 222,
    completed: false,
    addresses: [],
    assignees: [{ id: 222, name: "Jack" }]
  }];
  
it('should getFilterTicketsVmByRoute', () => {
    const result = getFilterTicketsVmByRoute.projector(tickets, users)
    expect(result).toEqual(tickets_vm)
})