import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, of, Subject, throwError } from "rxjs";
import { delay, tap } from "rxjs/operators";
import { Phone, Ticket, User } from "../models/model";
import { phoneAdapter } from "../reducers/tickets.reducer";
import { ErrorService } from "./error.service";

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
  phones: phoneAdapter.getInitialState()
};

function randomDelay() {
  return Math.random() * 1000;
}

@Injectable()
export class BackendService {
  // private ticketForm: BehaviorSubject<
  //   FormGroup | undefined
  // > = new BehaviorSubject(this.fb.group(emptyTicket));
  // ticketForm$: Observable<FormGroup> = this.ticketForm.asObservable();

  addPhone(updates: Ticket) {
    //const updatedTicket = { ...updates, phones: [...updates.phones] };
    //updatedTicket.phones.push({ id: -1, type: "", number: "" });

    // this.storedTickets = this.storedTickets.map(t =>
    //   t.id === updatedTicket.id ? updatedTicket : t
    // );

    //return of(updatedTicket).pipe(delay(randomDelay()));
  }

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

  constructor(private errorService: ErrorService) {}

  storedTickets: Ticket[] = [
    {
      id: 0,
      description: "Install a monitor arm",
      assigneeId: 111,
      completed: false,
      phones: phoneAdapter.getInitialState([
        { id: 1, type: "home", number: "111" },
        { id: 2, type: "mobile", number: "222" }
      ])
    },
    {
      id: 1,
      description: "Move the desk to the new location",
      assigneeId: 111,
      completed: false,
      phones: phoneAdapter.getInitialState([
        { id: 10, type: "home", number: "333" },
        { id: 11, type: "mobile", number: "444" }
      ])
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
    return this.storedTickets.find(ticket => ticket.id === +id);
  };

  private findUserById = id => this.storedUsers.find(user => user.id === +id);

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

  ticket(id: number): Observable<Ticket> {
    return of(this.findTicketById(id));
  }

  users() {
    return of(this.storedUsers).pipe(delay(randomDelay()));
  }

  user(id: number) {
    return of(this.findUserById(id)).pipe(delay(randomDelay()));
  }

  newTicket(payload: {
    description: string;
    assigneeId: number;
    phones: Phone[];
  }) {
    const newTicket: Ticket = {
      id: ++this.lastId,
      description: payload.description,
      assigneeId: payload.assigneeId,
      completed: false,
      phones: phoneAdapter.getInitialState(payload.phones)
    };

    this.storedTickets = this.storedTickets.concat(newTicket);

    return of(newTicket).pipe(delay(randomDelay()));
  }

  assign(ticketId: number, userId: number) {
    return this.update(ticketId, { assigneeId: userId });
  }

  complete(ticketId: number, completed: boolean) {
    return this.update(ticketId, { completed });
  }

  update(ticketId: number, updates: Partial<Omit<Ticket, "id">>) {
    const foundTicket = this.findTicketById(ticketId);

    if (!foundTicket) {
      return throwError(new Error("ticket not found"));
    }

    const updatedTicket = { ...foundTicket, ...updates };

    this.storedTickets = this.storedTickets.map(t =>
      t.id === ticketId ? updatedTicket : t
    );

    return of(updatedTicket).pipe(delay(randomDelay()));
  }
}
