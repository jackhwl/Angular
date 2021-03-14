import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AppComponent } from "./containers/app.component";
import { TicketsComponent } from "./containers/tickets.component";

const routes: Routes = [
  { path: "tickets", component: TicketsComponent },
  { path: "tickets/:id", component: TicketsComponent },
  { path: "", redirectTo: "tickets", pathMatch: "full" },
  { path: "**", component: AppComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
