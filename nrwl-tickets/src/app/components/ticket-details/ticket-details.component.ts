import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { TicketsFacade } from "src/app/services";
import { Ticket } from "../../services/backend.service";

@Component({
  selector: "vi-ticket-details",
  templateUrl: "./ticket-details.component.html",
  styleUrls: ["./ticket-details.component.scss"]
})
export class TicketDetailsComponent implements OnInit {
  currentTicket: Ticket;
  id: string;
  constructor(
    private ticketsFacade: TicketsFacade,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.route.params.subscribe(_ => (this.id = _.id));
  }

  ngOnInit(): void {
    this.ticketsFacade.selectedTicket$.subscribe(
      tickets => (this.currentTicket = { ...tickets })
    );
    if (this.id !== null) {
      this.selectTicketById(this.id === "new" ? null : this.id);
    }
  }

  saved(ticket) {
    if (ticket.id !== null) {
      this.ticketsFacade.updateTicket(ticket);
    } else {
      this.ticketsFacade.createTicket(ticket);
    }
    this.router.navigate(["tickets"]);
  }
  cancelled() {
    this.router.navigate(["tickets"]);
  }

  selectTicketById(id: string) {
    this.ticketsFacade.selectTicketById(id);
  }
}
