import { ChangeDetectionStrategy } from "@angular/core";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { TicketsActions } from "src/app/actions";
import { Ticket } from "../../services/backend.service";
import * as TicketsSelectors from "../../reducers/tickets.selectors";
import * as UsersSelectors from "../../reducers/users.selectors";
import { map, tap } from "rxjs/operators";
import { UtilService } from "src/app/services";

@Component({
  selector: "vi-ticket-details",
  templateUrl: "./ticket-details.component.html",
  styleUrls: ["./ticket-details.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TicketDetailsComponent implements OnInit {
  detailForm$: Observable<FormGroup>;
  users$ = this.store.pipe(select(UsersSelectors.getAllUsers));
  selectedTicketByRoute$: Observable<Ticket> = this.store.pipe(
    select(TicketsSelectors.getSelectedByRoute)
  );
  constructor(
    private store: Store<{}>,
    private router: Router,
    private service: UtilService
  ) {}

  ngOnInit(): void {
    this.detailForm$ = this.selectedTicketByRoute$.pipe(
      map((ticket: Ticket) => this.service.generateTicketForm(ticket))
    );
    // this.detailForm$.subscribe(
    //   (ticket: FormGroup) => (this.detailForm = ticket)
    // );
  }

  // only needed in Template-Driven Forms when display {{id.value}} in form
  // get id() {
  //   return this.detailForm.get("id");
  // }

  onSubmit(detailForm: FormGroup): void {
    const ticket = detailForm.value as Ticket;
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

  createPhone() {
    // return this.fb.group({
    //   name: '',
    //   description: '',
    //   price: ''
    // });
  }

  addPhone(detailForm: FormGroup): void {
    const ticket = detailForm.value as Ticket;
    this.store.dispatch(TicketsActions.addPhone({ ticket }));
  }

  deletePhone(index: number) {
    console.log("delete phone index:", index);
    //this.teamFormService.deletePlayer(index)
  }
}
