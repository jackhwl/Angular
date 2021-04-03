import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";
import { TicketsFacade } from "../../services";
import { Ticket, User } from "../../services/backend.service";

@Component({
  selector: "vi-ticket-details",
  templateUrl: "./ticket-details.component.html",
  styleUrls: ["./ticket-details.component.scss"]
})
export class TicketDetailsComponent implements OnInit {
  users$ = this.ticketsFacade.allUsers$;
  detailForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private ticketsFacade: TicketsFacade,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.detailForm = this.fb.group({
      status: [""],
      id: [""],
      assigneeId: [""],
      completed: [""],
      description: [""]
    });

    this.ticketsFacade.selectedTicketByRoute$.subscribe((ticket: Ticket) =>
      this.detailForm.patchValue({
        ...ticket,
        status: ticket.id === null ? "New Ticket" : "Edit Ticket"
      })
    );
  }

  onSubmit(): void {
    const ticket = this.detailForm.value as Ticket;
    if (ticket.id !== null && ticket.id !== undefined) {
      this.ticketsFacade.updateTicket(ticket);
    } else {
      this.ticketsFacade.createTicket(ticket);
    }
    this.router.navigate(["tickets"], { queryParamsHandling: "merge" });
  }

  cancelled(): void {
    this.router.navigate(["tickets"], { queryParamsHandling: "merge" });
  }
}
