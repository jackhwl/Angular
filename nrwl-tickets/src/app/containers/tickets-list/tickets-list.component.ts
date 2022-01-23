import { ChangeDetectionStrategy } from "@angular/core";
import { Component } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { combineLatest, Observable } from "rxjs";
import { map, tap } from "rxjs/operators";
import * as TicketsSelectors from "../../reducers/ticket.selectors";
import * as UsersSelectors from "../../reducers/user.selectors";
import * as PhonesSelectors from "../../reducers/phone.selectors";
import { TicketVm } from "src/app/models/ticketvm";
import { Phone, Ticket, Ticket_vm, User } from "src/app/models/model";

@Component({
  selector: "vi-tickets-list",
  templateUrl: "./tickets-list.component.html",
  styleUrls: ["./tickets-list.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TicketsListComponent {
  private allTickets$: Observable<Ticket[]> = this.store.pipe(
    select(TicketsSelectors.getAllTickets)
  );

  private allUsers$: Observable<User[]> = this.store.pipe(
    select(UsersSelectors.getAllUsers)
  );
  
  private allPhones$: Observable<Phone[]> = this.store.pipe(
    select(PhonesSelectors.getAllPhones)
  );

  loaded$ = this.store.pipe(select(TicketsSelectors.getLoaded));
  tickets$ = this.getAllTicketVms();

  constructor(private store: Store<{}>) {}

  getAllTicketVms(): Observable<Ticket[]> {
    return combineLatest([this.allTickets$, this.allUsers$]).pipe(
      //tap(console.log),
      map(([tickets, users]) =>
        tickets.map((ticket: TicketVm) => ({
          ...ticket,
          assignees: users.filter(user => user.id === ticket.assigneeId),
          
        }))
      )
    );
  }
}
