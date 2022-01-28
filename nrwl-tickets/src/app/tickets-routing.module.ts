import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { TicketDetailsComponent } from "./containers/ticket-details/ticket-details.component";
import { TicketListComponent } from "./containers/ticket-list/ticket-list.component";
import { TicketsComponent } from "./containers/tickets/tickets.component";

export const routes: Routes = [
  {
    path: "",
    component: TicketsComponent,
    children: [
      { path: ":id", component: TicketDetailsComponent },
      { path: "", component: TicketListComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TicketsRoutingModule {}
