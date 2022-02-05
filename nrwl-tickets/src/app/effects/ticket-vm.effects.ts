import { Injectable } from "@angular/core";
import { pessimisticUpdate } from "@nrwl/angular";
import { switchMap } from "rxjs/operators";
import { createEffect, Actions, ofType } from "@ngrx/effects";
import { AddressActions, PhoneActions, TicketActions, TicketApiActions, TicketDetailsPageActions } from "../actions";
import { TicketService } from "../services/ticket.service";
import { AddressService } from "../services/address.service";
import { of } from "rxjs";

@Injectable()
export class TicketVmEffects {
  constructor(
    private actions$: Actions,
    private ticketService: TicketService,
    private addressService: AddressService
  ) {}

  upsertTicketVm$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TicketDetailsPageActions.upsertTicketVm),
      pessimisticUpdate({
        run: action => {
            const ticket = this.ticketService.getTicketFromVm(action.ticketVm)
            const addresses = action.ticketVm.addresses.map(a_vm => this.addressService.getAddressFromVm(a_vm))
            const aIdPhones = action.ticketVm.addresses.map(a => ({addressId: a.id, phones: a.phones}))
            return of(action).pipe(
                switchMap (_ => [
                  TicketActions.upsertTicket({ ticket }),
                  PhoneActions.updatePhones({ aIdPhones }),
                  AddressActions.updateAddresses({ ticketId: action.ticketVm.id, addresses }),
                ])
        )},
        onError: (action, error) => {
          console.error("Error", error);
          return TicketApiActions.upsertTicketFailure({ error });
        }
      })
    )
  );

  deleteTicketVm$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TicketDetailsPageActions.deleteTicketVm),
      pessimisticUpdate({
        run: action => {
            const ticket = this.ticketService.getTicketFromVm(action.ticketVm)
            const addressIds = action.ticketVm.addresses.map(a => a.id)
            return of(action).pipe(
                switchMap (_ => [
                  TicketActions.deleteTicket({ id: ticket.id }),
                  AddressActions.deleteTicketAddresses({ ticketId: ticket.id }),
                  PhoneActions.deleteAddressesPhones({ addressIds }),
                ])
        )},
        onError: (action, error) => {
          console.error("Error", error);
          return TicketApiActions.deleteTicketFailure({ error });
        }
      })
    )
  );  

}