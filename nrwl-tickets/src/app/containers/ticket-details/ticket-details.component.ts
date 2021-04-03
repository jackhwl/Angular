import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, FormBuilder } from "@angular/forms";
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
  detailForm: FormGroup;
  currentTicket: Ticket = {
    id: null,
    description: "",
    assigneeId: null,
    completed: false
  };
  // detailForm = new FormGroup({
  //   assigneeId: new FormControl(this.currentTicket.assigneeId),
  //   completed: new FormControl(this.currentTicket.completed),
  //   description: new FormControl(this.currentTicket.description)
  // });

  constructor(
    private fb: FormBuilder,
    private ticketsFacade: TicketsFacade,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.detailForm = this.fb.group({
      assigneeId: [""],
      completed: [""],
      description: [""]
    });

    this.ticketsFacade.selectTicketByRoute();
    this.ticketsFacade.selectedTicketByRoute$.subscribe(
      (ticket: Ticket) => (this.currentTicket = { ...ticket })
    );
  }

  saved(ticket: Ticket): void {
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
