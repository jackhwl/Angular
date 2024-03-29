import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { BackendService } from "./services/backend.service";
import { TicketsComponentsModule } from "./containers/ticketsComponentsModule";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import * as fromTicketModule from "./reducers";
import { TicketEffects } from "./effects/ticket.effects";
import { TicketsComponent } from "./containers/tickets/tickets.component";
import { TicketsRoutingModule } from "./tickets-routing.module";
import { UsersEffects } from "./effects/user.effects";
import { UtilService } from "./services";
import { PhoneEffects } from "./effects/phone.effects";
import { TicketService } from "./services/ticket.service";
import { AddressService } from "./services/address.service";
import { AddressEffects } from "./effects/address.effects";
import { PhoneService } from "./services/phone.service";
import { TicketVmEffects } from "./effects/ticket-vm.effects";

@NgModule({
  declarations: [TicketsComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TicketsComponentsModule,
    TicketsRoutingModule,
    StoreModule.forFeature(
      fromTicketModule.TICKETMODULE_FEATURE_KEY,
      fromTicketModule.reducers
    ),
    EffectsModule.forFeature([PhoneEffects, TicketEffects, TicketVmEffects, UsersEffects, AddressEffects])
  ],
  providers: [BackendService, TicketService, UtilService, AddressService, PhoneService]
})
export class TicketsModule {}
