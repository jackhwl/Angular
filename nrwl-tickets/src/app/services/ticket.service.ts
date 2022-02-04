import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, of, Subject, throwError } from "rxjs";
import { delay, tap } from "rxjs/operators";
import { Phone, Ticket, TicketBase, Ticket_vm, User } from "../models/model";
import { initialState, adapter } from "../reducers/phone.reducer";
import { AddressService } from "./address.service";
import { ErrorService } from "./error.service";
import { v4 as uuidv4 } from 'uuid';

/**
 * This service acts as a mock backend.
 *
 * You are free to modify it as you see.
 */

export const emptyTicket: Ticket = {
  id: null,
  description: "",
  assigneeId: null,
  completed: false,
  addressIds: []
};

function randomDelay() {
  return Math.random() * 1000;
}

@Injectable()
export class TicketService {
  // private ticketForm: BehaviorSubject<
  //   FormGroup | undefined
  // > = new BehaviorSubject(this.fb.group(emptyTicket));
  // ticketForm$: Observable<FormGroup> = this.ticketForm.asObservable();

  // addPhone0() {
  //   const currentTeam = this.ticketForm.getValue();
  //   // const currentPlayers = currentTeam.get('players') as FormArray
  //   // currentPlayers.push(
  //   //   this.fb.group(
  //   //     new PhoneForm(new Player('', '', 0, ''))
  //   //   )
  //   // )
  //   this.ticketForm.next(currentTeam);
  // }

  constructor(private errorService: ErrorService, private addressService: AddressService) {}

  storedTickets: Ticket[] = [
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

  storedUsers: User[] = [
    { id: 111, name: "Victor" },
    { id: 222, name: "Jack" }
  ];

  lastId = 1;
  private error = new Subject();
  error$ = this.error.asObservable();

  private findTicketById = id => {
    const ticket = this.storedTickets.find(ticket => ticket.id === id);
    const addressIds = this.addressService.getAll().filter(a => a.ticketId === id).map(a => a.id)
    return { ...ticket, addressIds };
  };

  private findUserById = id => this.storedUsers.find(user => user.id === +id);


  getTicketFromVm(ticket_vm: Ticket_vm): Ticket {
    return {
      id: ticket_vm.id,
      description: ticket_vm.description,
      assigneeId: ticket_vm.assigneeId,
      completed: ticket_vm.completed,
      addressIds: ticket_vm.addresses.map(a => a.id)
    };
  }

  tickets() {
    return of(this.storedTickets).pipe(delay(randomDelay()));
  }

  filteredTickets(queryStr: string) {
    if (!queryStr) return this.tickets();
    const ids = this.storedUsers
      .filter(user => user.name.toLowerCase().includes(queryStr.toLowerCase()))
      .map(user => user.id);

    return of(
      this.storedTickets.filter((ticket: Ticket) => {
        if (queryStr === "error") throw "something wrong @ backend";
        return (
          ticket.description.toLowerCase().includes(queryStr.toLowerCase()) ||
          ids.includes(ticket.assigneeId)
        );
      })
    ).pipe(delay(randomDelay()), this.errorService.retryAfter());
  }

  ticket(id: string): Observable<Ticket> {
    if (id.toString() === 'new') return of(emptyTicket);

    const foundTicket = this.findTicketById(id)
    if (!foundTicket) {
      throw "ticket not found";
      //return throwError(new Error("ticket not found 2"));
    }
    return of(foundTicket);
  }

  users() {
    return of(this.storedUsers).pipe(delay(randomDelay()));
  }

  user(id: number) {
    return of(this.findUserById(id)).pipe(delay(randomDelay()));
  }

  newTicket(ticket: Ticket) {
    const newTicket: Ticket = {
      id: uuidv4(),
      description: ticket.description,
      assigneeId: ticket.assigneeId,
      completed: false,
      addressIds: []
    };

    this.storedTickets = this.storedTickets.concat(newTicket);

    return of(newTicket).pipe(delay(randomDelay()));
  }

  assign(ticketId: string, userId: number) {
    return this.update(ticketId, { assigneeId: userId });
  }

  complete(ticketId: string, completed: boolean) {
    return this.update(ticketId, { completed });
  }

  update(ticketId: string, updates: Partial<Omit<Ticket, "id">>) {
    const foundTicket = this.findTicketById(ticketId);

    if (!foundTicket) {
      return throwError(new Error("ticket not found"));
    }

    //console.log(foundTicket, updates);
    let updatedTicket = { ...foundTicket, ...updates };


    this.storedTickets = this.storedTickets.map(t =>
      t.id === ticketId ? { ...updatedTicket } : t
    );
    delete updatedTicket.addressIds
    return of(updatedTicket).pipe(delay(randomDelay()));
  }
}
