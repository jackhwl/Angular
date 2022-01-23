import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, of, Subject, throwError } from "rxjs";
import { delay, tap } from "rxjs/operators";
import { Phone, Ticket, User } from "../models/model";
import { initialState, adapter } from "../reducers/phone.reducer";
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
  phoneIds: [],
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

  constructor(private errorService: ErrorService) {}

  storedTickets: Ticket[] = [
    {
      id: 0,
      description: "Install a monitor arm",
      assigneeId: 111,
      completed: false,
      phoneIds: [1, 2],
      addressIds: ["a1","a2"]
    },
    {
      id: 1,
      description: "Move the desk to the new location",
      assigneeId: 222,
      completed: false,
      phoneIds: [3,4],
      addressIds: ["a3","a4"]
    }
  ];

  storedPhones: Phone[] = [
    { id: 1, type: "home", number: "111" },
    { id: 2, type: "mobile", number: "222" },
    { id: 3, type: "home", number: "333" },
    { id: 4, type: "mobile", number: "444" }
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

  addPhone(): Observable<Phone> {
    let id = Math.max(...this.storedPhones.map(p=> p.id));
    const newPhone: Phone = { id: ++id, type: "", number: "" }
    this.storedPhones = this.storedPhones.concat(newPhone);
    return of(newPhone).pipe(delay(randomDelay()));
    //const updatedTicket = { ...updates, phones: [...updates.phones] };
    //updatedTicket.phones.push({ id: -1, type: "", number: "" });

    // this.storedTickets = this.storedTickets.map(t =>
    //   t.id === updatedTicket.id ? updatedTicket : t
    // );

    //return of(updatedTicket).pipe(delay(randomDelay()));
  }

  deletePhone(id: number): Observable<Boolean> {
    this.storedPhones = this.storedPhones.filter(p => p.id !== id);
    return of(true).pipe(delay(randomDelay()));
    //const updatedTicket = { ...updates, phones: [...updates.phones] };
    //updatedTicket.phones.push({ id: -1, type: "", number: "" });

    // this.storedTickets = this.storedTickets.map(t =>
    //   t.id === updatedTicket.id ? updatedTicket : t
    // );

    //return of(updatedTicket).pipe(delay(randomDelay()));
  }

  updatePhones(phones: Phone[]): Observable<Boolean> {
    this.storedPhones = this.storedPhones.filter(p => !phones.map(p=>p.id).includes(p.id) ).concat(phones);
    return of(true).pipe(delay(randomDelay()));
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

  ticket(id: number): Observable<Ticket> {
    if (id.toString() === 'new') return of(emptyTicket);

    const foundTicket = this.findTicketById(id)
    if (!foundTicket) {
      throw "ticket not found";
      //return throwError(new Error("ticket not found 2"));
    }
    return of(foundTicket);
  }


  phones() {
    return of(this.storedPhones).pipe(delay(randomDelay()));
  }

  users() {
    return of(this.storedUsers).pipe(delay(randomDelay()));
  }

  user(id: number) {
    return of(this.findUserById(id)).pipe(delay(randomDelay()));
  }

  newTicket(ticket: Ticket) {
    const newTicket: Ticket = {
      id: ++this.lastId,
      description: ticket.description,
      assigneeId: ticket.assigneeId,
      completed: false,
      phoneIds: [],
      addressIds: []
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
