import { ChangeDetectionStrategy } from "@angular/core";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { TicketsActions } from "src/app/actions";
import { Ticket } from "../../services/backend.service";
import * as TicketsSelectors from "../../reducers/tickets.selectors";
import * as UsersSelectors from "../../reducers/users.selectors";
import { tick } from "@angular/core/testing";
import { map, tap } from "rxjs/operators";
import { fn } from "@angular/compiler/src/output/output_ast";

@Component({
  selector: "vi-ticket-details",
  templateUrl: "./ticket-details.component.html",
  styleUrls: ["./ticket-details.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TicketDetailsComponent implements OnInit {
  detailForm$: Observable<FormGroup>;
  users$ = this.store.pipe(select(UsersSelectors.getAllUsers));
  detailForm = this.fb.group({
    title: [""],
    id: [""],
    assigneeId: ["", Validators.required],
    completed: ["", Validators.required],
    description: ["", Validators.required],
    phones: this.fb.array([
      this.fb.group({
        type: "",
        number: ""
      })
    ])
  });
  selectedTicketByRoute$: Observable<Ticket> = this.store.pipe(
    select(TicketsSelectors.getSelectedByRoute)
  );
  formGroup$ = this.selectedTicketByRoute$.pipe(
    map((ticket: Ticket) =>
      this.fb.group({
        id: [ticket.id],
        assigneeId: [ticket.assigneeId, Validators.required],
        completed: [ticket.completed, Validators.required],
        description: [ticket.description, Validators.required],
        phones: this.fb.array(
          ticket.phones.map(phone =>
            this.fb.group({
              type: [phone.type],
              number: [phone.number]
            })
          )
        ),
        title: [ticket.id === null ? "New Ticket" : "Edit Ticket"]
      })
    )
  );
  constructor(
    private fb: FormBuilder,
    private store: Store<{}>,
    private router: Router
  ) {}

  ngOnInit(): void {
    // this.detailForm$ = this.selectedTicketByRoute$.pipe(
    //   //tap(ticket => console.log(ticket)),
    //   map(ticket =>
    //     this.fb.group({
    //       ...ticket,
    //       title: ticket.id === null ? "New Ticket" : "Edit Ticket"
    //     })
    //   )
    // );
    this.formGroup$.subscribe(
      (ticket: FormGroup) => (this.detailForm = ticket)
    );
  }

  // only needed in Template-Driven Forms when display {{id.value}} in form
  get id() {
    return this.detailForm.get("id");
  }

  onSubmit(detailForm: FormGroup): void {
    const ticket = detailForm.value as Ticket;
    //console.log(fm);
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
