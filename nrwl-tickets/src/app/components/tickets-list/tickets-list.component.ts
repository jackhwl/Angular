import { Component } from "@angular/core";
import { Observable } from "rxjs";
import { TicketVm } from "src/app/models/ticketvm";
import { TicketsFacade } from "src/app/services";

@Component({
  selector: "vi-tickets-list",
  templateUrl: "./tickets-list.component.html",
  styleUrls: ["./tickets-list.component.scss"]
})
export class TicketsListComponent {
  tickets$: Observable<TicketVm[]> = this.ticketsFacade.allTicketVms$;
  constructor(private ticketsFacade: TicketsFacade) {}
}
