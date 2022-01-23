import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { BackendService } from "./services/backend.service";
import { TicketsComponentsModule } from "./containers/ticketsComponentsModule";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import * as fromTicketModule from "./reducers";
import { TicketsEffects } from "./effects/tickets.effects";
import { TicketsComponent } from "./containers/tickets/tickets.component";
import { TicketsRoutingModule } from "./tickets-routing.module";
import { UsersEffects } from "./effects/users.effects";
import { UtilService } from "./services";
import { PhonesEffects } from "./effects/phones.effects";
import { TicketService } from "./services/ticket.service";
import { AddressService } from "./services/address.service";
import { AddressEffects } from "./effects/address.effects";

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
    EffectsModule.forFeature([PhonesEffects, TicketsEffects, UsersEffects, AddressEffects])
  ],
  providers: [BackendService, TicketService, UtilService, AddressService]
})
export class TicketsModule {}
