import { ChangeDetectionStrategy } from "@angular/core";
import { Component } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { combineLatest, Observable } from "rxjs";
import { map } from "rxjs/operators";
import * as TicketsSelectors from "../../reducers/tickets.selectors";
import * as UsersSelectors from "../../reducers/users.selectors";
import { TicketVm } from "src/app/models/ticketvm";
import { Ticket, User } from "src/app/services/backend.service";

@Component({
  selector: "vi-tickets-list",
  templateUrl: "./tickets-list.component.html",
  styleUrls: ["./tickets-list.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TicketsListComponent {
  loaded$ = this.store.pipe(select(TicketsSelectors.getLoaded));

  allTickets$: Observable<Ticket[]> = this.store.pipe(
    select(TicketsSelectors.getAllTickets)
  );

  allUsers$: Observable<User[]> = this.store.pipe(
    select(UsersSelectors.getAllUsers)
  );

  tickets$ = this.getAllTicketVms();

  constructor(private store: Store<{}>) {}

  getAllTicketVms(): Observable<TicketVm[]> {
    return combineLatest([this.allTickets$, this.allUsers$]).pipe(
      map(([tickets, users]) =>
        tickets.map((ticket: TicketVm) => ({
          ...ticket,
          assignees: users.filter(user => user.id === ticket.assigneeId)
        }))
      )
    );
  }
}
