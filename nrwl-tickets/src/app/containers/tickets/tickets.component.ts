import { Component } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { Observable } from "rxjs";
import { filter } from "rxjs/operators";
import { TicketsFacade } from "../../services";

@Component({
  selector: "vi-tickets-root",
  templateUrl: "./tickets.component.html",
  styleUrls: ["./tickets.component.css"]
})
export class TicketsComponent {
  error$: Observable<any> = this.ticketsFacade.error$;
  q$: Observable<any> = this.ticketsFacade.q$;

  constructor(private ticketsFacade: TicketsFacade, private router: Router) {
    this.router.events
      ?.pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(_ => {
        this.ticketsFacade.loadUsers();
        this.ticketsFacade.loadFilterTicketsByRoute();
      });
  }

  query(q) {
    this.router.navigate(["tickets"], {
      queryParams: { q },
      queryParamsHandling: "merge"
    });
  }
}
