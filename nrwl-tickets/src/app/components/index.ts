import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MaterialModule } from "../material.module";
import { RouterModule, Routes } from "@angular/router";

import { TicketDetailsComponent } from "./ticket-details/ticket-details.component";
import { TicketsListComponent } from "./tickets-list/tickets-list.component";
import { FooterComponent } from "./footer/footer.component";

export const COMPONENTS = [
  TicketsListComponent,
  TicketDetailsComponent,
  FooterComponent
];

@NgModule({
  imports: [CommonModule, MaterialModule, FormsModule, RouterModule],
  declarations: COMPONENTS,
  exports: COMPONENTS
})
export class TicketsComponentsModule {}
