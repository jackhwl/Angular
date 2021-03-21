import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { TicketsFacade } from "../../services";
import { Ticket, User } from "../../services/backend.service";

@Component({
  selector: "vi-ticket-details",
  templateUrl: "./ticket-details.component.html",
  styleUrls: ["./ticket-details.component.scss"]
})
export class TicketDetailsComponent implements OnInit {
  users$: Observable<User[]> = this.ticketsFacade.allUsers$;

  currentTicket: Ticket;
  constructor(private ticketsFacade: TicketsFacade, private router: Router) {}

  ngOnInit(): void {
    this.ticketsFacade.selectTicketByRoute();
    this.ticketsFacade.selectedTicketByRoute$.subscribe(
      tickets => (this.currentTicket = { ...tickets })
    );
  }

  saved(ticket) {
    if (ticket.id !== null && ticket.id !== undefined) {
      this.ticketsFacade.updateTicket(ticket);
    } else {
      this.ticketsFacade.createTicket(ticket);
    }
    this.router.navigate(["tickets"], { queryParamsHandling: "merge" });
  }

  cancelled() {
    this.router.navigate(["tickets"], { queryParamsHandling: "merge" });
  }
}
