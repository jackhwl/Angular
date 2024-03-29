import { ChangeDetectionStrategy } from "@angular/core";
import { Component } from "@angular/core";
import { TicketsFacade } from "../../services";

@Component({
  selector: "vi-tickets-list",
  templateUrl: "./tickets-list.component.html",
  styleUrls: ["./tickets-list.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TicketsListComponent {
  loaded$ = this.ticketsFacade.loaded$;
  tickets$ = this.ticketsFacade.allTicketVms$;
  constructor(private ticketsFacade: TicketsFacade) {}
}
