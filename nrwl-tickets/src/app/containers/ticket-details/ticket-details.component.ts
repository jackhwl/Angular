import { ChangeDetectionStrategy } from "@angular/core";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { TicketsActions } from "src/app/actions";
import { Ticket } from "../../services/backend.service";
import * as TicketsSelectors from "../../reducers/tickets.selectors";
import * as UsersSelectors from "../../reducers/users.selectors";

@Component({
  selector: "vi-ticket-details",
  templateUrl: "./ticket-details.component.html",
  styleUrls: ["./ticket-details.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TicketDetailsComponent implements OnInit {
  users$ = this.store.pipe(select(UsersSelectors.getAllUsers));
  detailForm = this.fb.group({
    title: [""],
    id: [""],
    assigneeId: ["", Validators.required],
    completed: ["", Validators.required],
    description: ["", Validators.required]
  });
  selectedTicketByRoute$: Observable<Ticket> = this.store.pipe(
    select(TicketsSelectors.getSelectedByRoute)
  );
  constructor(
    private fb: FormBuilder,
    private store: Store<{}>,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.selectedTicketByRoute$.subscribe((ticket: Ticket) =>
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
      this.updateTicket(ticket);
    } else {
      this.createTicket(ticket);
    }
    this.router.navigate(["tickets"], { queryParamsHandling: "merge" });
  }

  cancelled(): void {
    this.router.navigate(["tickets"], { queryParamsHandling: "merge" });
  }

  createTicket(ticket: Ticket): void {
    this.store.dispatch(TicketsActions.createTicket({ ticket }));
  }

  updateTicket(ticket: Ticket): void {
    this.store.dispatch(TicketsActions.updateTicket({ ticket }));
  }
}
