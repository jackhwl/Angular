import { ChangeDetectionStrategy } from "@angular/core";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { TicketsActions } from "src/app/actions";

import * as TicketsSelectors from "../../reducers/tickets.selectors";
import * as UsersSelectors from "../../reducers/users.selectors";
import { map, tap } from "rxjs/operators";
import { UtilService } from "src/app/services";
import { Ticket } from "src/app/models/model";

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
    //this.router.navigate(["tickets"], { queryParamsHandling: "merge" });
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

  deletePhone(index: number) {
    console.log("delete phone index:", index);
    //this.store.dispatch(TicketsActions.addPhone({ ticket }));
  }

  addPhone(detailForm: FormGroup): void {
    const ticket = detailForm.value as Ticket;
    this.store.dispatch(TicketsActions.addPhone({ ticket }));
    // const test = "abc";
    // let addPhone2 = this.createAction("[Tickets] Add Phone2", this.props());
    // let testObj = { test: "123" };
    // let addPhone02 = TicketsActions.addPhone2(testObj);
    // console.log("addPhone2=", addPhone2);
    // let ap = addPhone2(testObj);
    // console.log("addPhone2({test})=", ap);
    // ap.type0 = "aaa";
    // console.log("ap", ap);
    // console.log("addPhone02=", addPhone02);
    // console.log("testObj=", testObj);

    // this.on(TicketsActions.addPhone, TicketsActions.createTicket, (state, { ticket }) => ({
    //   ...state,
    //   loaded: false
    // }))

    //a1.type = 'aaa';
    //let ac = this.defineType("[Tickets] Add Phone", { test });
    //console.log('ac=', ac);
    // {test: 'abc', type: '[Tickets] Add Phone2'}
  }

  createAction(type, config) {
    // REGISTERED_ACTION_TYPES[type] = (REGISTERED_ACTION_TYPES[type] || 0) + 1;
    // if (typeof config === 'function') {
    //     return defineType(type, (...args) => ({
    //         ...config(...args),
    //         type,
    //     }));
    // }
    console.log("config=", config);
    const as = config ? config._as : "empty";
    switch (as) {
      case "empty":
        return this.defineType(type, () => ({ type }));
      case "props":
        let aa = this.defineType(type, props => ({
          ...props,
          type
        }));
        console.log("aa=", aa.type);
        return aa;
      default:
        throw new Error("Unexpected config.");
    }
  }

  props() {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion, @typescript-eslint/naming-convention
    return { _as: "props", _p: undefined };
  }

  defineType(type, creator) {
    console.log("creator1=", creator);
    console.log("creator1.type=", creator.type);
    Object.defineProperty(creator, "type", {
      value: type,
      writable: false
    });
    console.log("creator2=", creator);
    console.log("creator2.type=", creator.type);
    return creator;
  }


  on(...args) {
    //console.log('on--args:', args);
    const reducer = args.pop();
    const types = args.map((creator) => creator.type);
    console.log('on--args:', args);
    console.log('on--reducer:', reducer);
    console.log('on--types:', types);
    return { reducer, types };
  }
}
