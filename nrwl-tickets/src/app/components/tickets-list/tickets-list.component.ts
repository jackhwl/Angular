import { Component } from "@angular/core";
import { Observable } from "rxjs";
import { TicketVm } from "../../models/ticketvm";
import { TicketsFacade } from "../../services";

@Component({
  selector: "vi-tickets-list",
  templateUrl: "./tickets-list.component.html",
  styleUrls: ["./tickets-list.component.scss"]
})
export class TicketsListComponent {
  loaded$: Observable<boolean> = this.ticketsFacade.loaded$;
  tickets$: Observable<TicketVm[]> = this.ticketsFacade.allTicketVms$;
  constructor(private ticketsFacade: TicketsFacade) {}
}
