import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BackendService } from "./services/backend.service";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./containers/app.component";
import { TicketsComponentsModule } from "./components";
import { MaterialModule } from "./material.module";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import * as fromTickets from "./reducers/tickets.reducer";
import { TicketsFacade } from "./services";
import { TicketsEffects } from "./effects/tickets.effects";
import { TicketsComponent } from "./containers/tickets.component";

@NgModule({
  declarations: [AppComponent, TicketsComponent],
  imports: [
    CommonModule,
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    TicketsComponentsModule,
    MaterialModule,
    AppRoutingModule,
    StoreModule.forRoot({
      [fromTickets.TICKETS_FEATURE_KEY]: fromTickets.ticketsReducer
    }),
    EffectsModule.forRoot([TicketsEffects]),
    StoreDevtoolsModule.instrument({
      name: "NgRx Ticket App"
    })
  ],
  providers: [BackendService, TicketsFacade],
  bootstrap: [AppComponent]
})
export class AppModule {}
