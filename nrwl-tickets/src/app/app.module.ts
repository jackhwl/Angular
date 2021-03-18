import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./containers/app.component";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { TicketsModule } from "./tickets.module";
import { FooterComponent } from "./components/footer/footer.component";

@NgModule({
  declarations: [AppComponent, FooterComponent],
  imports: [
    TicketsModule,
    AppRoutingModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({
      name: "NgRx Ticket App"
    })
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
