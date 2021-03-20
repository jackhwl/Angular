import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable } from "rxjs";
import { TicketsFacade } from "src/app/services";
import { Ticket, User } from "../../services/backend.service";

@Component({
  selector: "vi-ticket-details",
  templateUrl: "./ticket-details.component.html",
  styleUrls: ["./ticket-details.component.scss"]
})
export class TicketDetailsComponent implements OnInit {
  users$: Observable<User[]> = this.ticketsFacade.allUsers$;
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
    this.router.navigate(["tickets"], { queryParamsHandling: "merge" });
  }

  cancelled() {
    this.router.navigate(["tickets"], { queryParamsHandling: "merge" });
  }

  selectTicketById(id: string) {
    this.ticketsFacade.selectTicketById(id);
  }
}
