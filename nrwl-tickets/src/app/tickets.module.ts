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
    EffectsModule.forFeature([TicketsEffects, UsersEffects])
  ],
  providers: [BackendService, UtilService]
})
export class TicketsModule {}
