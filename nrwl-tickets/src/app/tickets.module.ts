import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { BackendService } from "./services/backend.service";
import { TicketsComponentsModule } from "./components";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import * as fromTickets from "./reducers/tickets.reducer";
import { TicketsFacade } from "./services";
import { TicketsEffects } from "./effects/tickets.effects";
import { TicketsComponent } from "./containers/tickets/tickets.component";
import { TicketsRoutingModule } from "./tickets-routing.module";

@NgModule({
  declarations: [TicketsComponent],
  imports: [
    CommonModule,
    FormsModule,
    TicketsComponentsModule,
    TicketsRoutingModule,
    StoreModule.forFeature(
      fromTickets.TICKETS_FEATURE_KEY,
      fromTickets.ticketsReducer
    ),
    EffectsModule.forFeature([TicketsEffects])
  ],
  providers: [BackendService, TicketsFacade]
})
export class TicketsModule {}
