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
  users$ = this.ticketsFacade.allUsers$;

  currentTicket: Ticket = {
    id: null,
    description: "",
    assigneeId: null,
    completed: false
  };
  constructor(private ticketsFacade: TicketsFacade, private router: Router) {}

  ngOnInit() {
    this.ticketsFacade.selectTicketByRoute();
    this.ticketsFacade.selectedTicketByRoute$.subscribe(
      (ticket: Ticket) => (this.currentTicket = { ...ticket })
    );
  }

  saved(ticket: Ticket) {
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
