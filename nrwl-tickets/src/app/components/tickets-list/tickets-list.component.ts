import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Ticket } from "../../services/backend.service";

@Component({
  selector: "vi-tickets-list",
  templateUrl: "./tickets-list.component.html",
  styleUrls: ["./tickets-list.component.scss"]
})
export class TicketsListComponent {
  @Input() tickets: Ticket[];
  @Output() selected = new EventEmitter();
  @Output() deleted = new EventEmitter();
}
