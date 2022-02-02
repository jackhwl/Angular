import { ChangeDetectionStrategy } from "@angular/core";
import { Component, OnInit } from "@angular/core";
import { FormArray, FormControl, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { TicketActions, TicketDetailsPageActions } from "src/app/actions";

import * as TicketsVmSelectors from "../../reducers/ticket-vm.selectors";

import { map, tap } from "rxjs/operators";
import { UtilService } from "src/app/services";
import { Ticket, Ticket_vm } from "src/app/models/model";

@Component({
  selector: "vi-ticket-details",
  templateUrl: "./ticket-details.component.html",
  styleUrls: ["./ticket-details.component.scss"],
  //changeDetection: ChangeDetectionStrategy.OnPush
})
export class TicketDetailsComponent implements OnInit {
  detailForm$: Observable<FormGroup>;
  ticketId: number;
  
  constructor(
    private store: Store<{}>,
    private router: Router,
    private service: UtilService,
  ) {}

  ngOnInit(): void {
    this.store.dispatch(TicketDetailsPageActions.opened());
    this.detailForm$ = this.store.pipe(
      select(TicketsVmSelectors.getSelectedTicketVmByRoute),
      //tap(t=>console.log('ngOnInit',t)),
      map((ticket: Ticket_vm) => this.service.generateTicketForm(ticket))
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
    const ticketVm = detailForm.value as Ticket_vm;
    if (ticketVm.id !== null && ticketVm.id !== undefined) {
      this.updateTicketVm(ticketVm);
    } else {
      //this.createTicket(ticket);
    }
    //this.router.navigate(["./"], { queryParamsHandling: "merge" });
  }

  cancelled(): void {
    this.router.navigate(["./"], { queryParamsHandling: "merge" });
  }

  createTicket(ticket: Ticket): void {
    this.store.dispatch(TicketActions.createTicket({ ticket }));
  }

  updateTicketVm(ticketVm: Ticket_vm): void {
    this.store.dispatch(TicketDetailsPageActions.updateTicketVm({ ticketVm }));
  }

  deleteAddress(pa: FormArray, id: number) {
    pa.removeAt(id);
  }

  addAddress(pa: FormArray) {
    const [first] = pa.value
    const ea = this.service.getEmptyAddressFG()
    ea.addControl('ticketId', new FormControl(first.ticketId));
    //console.log(ea)
    pa.push(ea)
  }

  // createPhone() {
  //   // return this.fb.group({
  //   //   name: '',
  //   //   description: '',
  //   //   price: ''
  //   // });
  // }

  // addPhone2(ticketId: string): void {
  //   //const ticket = detailForm.value as Ticket;
  //   console.log(ticketId);
  //   this.store.dispatch(TicketActions.addPhone({ ticketId }));
  //   // const test = "abc";
  //   // let addPhone2 = this.createAction("[Tickets] Add Phone2", this.props());
  //   // let testObj = { test: "123" };
  //   // let addPhone02 = TicketActions.addPhone2(testObj);
  //   // console.log("addPhone2=", addPhone2);
  //   // let ap = addPhone2(testObj);
  //   // console.log("addPhone2({test})=", ap);
  //   // ap.type0 = "aaa";
  //   // console.log("ap", ap);
  //   // console.log("addPhone02=", addPhone02);
  //   // console.log("testObj=", testObj);

  //   // this.on(TicketActions.addPhone, TicketActions.createTicket, (state, { ticket }) => ({
  //   //   ...state,
  //   //   loaded: false
  //   // }))

  //   //a1.type = 'aaa';
  //   //let ac = this.defineType("[Tickets] Add Phone", { test });
  //   //console.log('ac=', ac);
  //   // {test: 'abc', type: '[Tickets] Add Phone2'}
  // }

  // createAction(type, config) {
  //   // REGISTERED_ACTION_TYPES[type] = (REGISTERED_ACTION_TYPES[type] || 0) + 1;
  //   // if (typeof config === 'function') {
  //   //     return defineType(type, (...args) => ({
  //   //         ...config(...args),
  //   //         type,
  //   //     }));
  //   // }
  //   console.log("config=", config);
  //   const as = config ? config._as : "empty";
  //   switch (as) {
  //     case "empty":
  //       return this.defineType(type, () => ({ type }));
  //     case "props":
  //       let aa = this.defineType(type, props => ({
  //         ...props,
  //         type
  //       }));
  //       console.log("aa=", aa.type);
  //       return aa;
  //     default:
  //       throw new Error("Unexpected config.");
  //   }
  // }

  // props() {
  //   // eslint-disable-next-line @typescript-eslint/no-non-null-assertion, @typescript-eslint/naming-convention
  //   return { _as: "props", _p: undefined };
  // }

  // defineType(type, creator) {
  //   console.log("creator1=", creator);
  //   console.log("creator1.type=", creator.type);
  //   Object.defineProperty(creator, "type", {
  //     value: type,
  //     writable: false
  //   });
  //   console.log("creator2=", creator);
  //   console.log("creator2.type=", creator.type);
  //   return creator;
  // }


  // on(...args) {
  //   //console.log('on--args:', args);
  //   const reducer = args.pop();
  //   const types = args.map((creator) => creator.type);
  //   console.log('on--args:', args);
  //   console.log('on--reducer:', reducer);
  //   console.log('on--types:', types);
  //   return { reducer, types };
  // }
}
