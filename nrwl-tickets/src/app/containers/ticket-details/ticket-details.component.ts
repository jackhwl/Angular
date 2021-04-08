import { ChangeDetectionStrategy } from "@angular/core";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { TicketsFacade } from "../../services";
import { Ticket } from "../../services/backend.service";

@Component({
  selector: "vi-ticket-details",
  templateUrl: "./ticket-details.component.html",
  styleUrls: ["./ticket-details.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TicketDetailsComponent implements OnInit {
  users$ = this.ticketsFacade.allUsers$;
  detailForm = this.fb.group({
    title: [""],
    id: [""],
    assigneeId: ["", Validators.required],
    completed: ["", Validators.required],
    description: ["", Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    private ticketsFacade: TicketsFacade,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.ticketsFacade.selectedTicketByRoute$.subscribe((ticket: Ticket) =>
      this.detailForm.patchValue({
        ...ticket,
        title: ticket.id === null ? "New Ticket" : "Edit Ticket"
      })
    );
  }

  get title() {
    return this.detailForm.get("title");
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
