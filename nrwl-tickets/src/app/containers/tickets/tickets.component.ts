import { Component } from "@angular/core";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { Observable } from "rxjs";
import { filter } from "rxjs/operators";
import { TicketsFacade } from "../../services";

@Component({
  selector: "vi-tickets-root",
  templateUrl: "./tickets.component.html",
  styleUrls: ["./tickets.component.css"]
})
export class TicketsComponent {
  title = "ticket managing";
  error$: Observable<any> = this.ticketsFacade.error$;
  query_str: string = "";

  constructor(
    private ticketsFacade: TicketsFacade,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.route.queryParams.subscribe(_ => (this.query_str = _.q));
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(_ => {
        this.ticketsFacade.loadUsers();
        this.ticketsFacade.loadFilterTickets(this.query_str);
      });
  }

  query() {
    this.router.navigate(["tickets"], {
      queryParams: { q: this.query_str },
      queryParamsHandling: "merge"
    });
  }
}
