import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { MaterialModule } from "../material.module";
import { RouterModule } from "@angular/router";

import { TicketDetailsComponent } from "./ticket-details/ticket-details.component";
import { TicketsListComponent } from "./tickets-list/tickets-list.component";
import { PhoneComponent } from "./phone/phone.component";

export const COMPONENTS = [
  TicketsListComponent,
  TicketDetailsComponent,
  PhoneComponent
];

@NgModule({
  imports: [CommonModule, MaterialModule, ReactiveFormsModule, RouterModule],
  declarations: COMPONENTS,
  exports: COMPONENTS
})
export class TicketsComponentsModule {}
