import { Component } from "@angular/core";
import { Observable } from "rxjs";
import { TicketsFacade } from "src/app/services";
import { Ticket } from "../../services/backend.service";

@Component({
  selector: "vi-tickets-list",
  templateUrl: "./tickets-list.component.html",
  styleUrls: ["./tickets-list.component.scss"]
})
export class TicketsListComponent {
  tickets$: Observable<Ticket[]> = this.ticketsFacade.allTickets$;
  constructor(private ticketsFacade: TicketsFacade) {}
}
