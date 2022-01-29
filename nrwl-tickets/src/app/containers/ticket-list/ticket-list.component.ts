import { ChangeDetectionStrategy, OnInit } from "@angular/core";
import { Component } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { Ticket_vm } from "src/app/models/model";
import * as TicketsSelectors from "../../reducers/ticket.selectors";
import * as TicketsVmSelectors from "../../reducers/ticket-vm.selectors";
import { TicketListPageActions } from "src/app/actions";

@Component({
  selector: "vi-ticket-list",
  templateUrl: "./ticket-list.component.html",
  styleUrls: ["./ticket-list.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TicketListComponent implements OnInit {

  tickets$: Observable<Ticket_vm[]> = this.store.pipe(
    select(TicketsVmSelectors.getFilterTicketsVmByRoute)
  );

  loaded$ = this.store.pipe(select(TicketsSelectors.getLoaded));

  constructor(private store: Store) {}
  ngOnInit(): void {
    this.store.dispatch(TicketListPageActions.opened());
  }
}
