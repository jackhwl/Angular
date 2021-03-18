import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { TicketsComponent } from "./containers/tickets.component";

export const routes: Routes = [
  { path: ":id", component: TicketsComponent },
  { path: "", redirectTo: "tickets", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TicketsRoutingModule {}
