import { Component } from "@angular/core";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { Observable } from "rxjs";
import { distinct, filter, map, tap } from "rxjs/operators";
import { selectTicketById } from "../actions/tickets.actions";
import { TicketsFacade } from "../services";
import { Ticket, User } from "../services/backend.service";

@Component({
  selector: "vi-tickets-root",
  templateUrl: "./tickets.component.html",
  styleUrls: ["./tickets.component.css"]
})
export class TicketsComponent {
  title = "ticket managing";
  tickets$: Observable<Ticket[]> = this.ticketsFacade.allTickets$;
  //users$: Observable<User[]> = this.ticketsFacade.allUsers$;
  selectedTicket$: Observable<Ticket> = this.ticketsFacade.selectedTicket$;
  error$: Observable<any> = this.ticketsFacade.error$;
  id: string;
  query_str: string = "";

  constructor(
    private ticketsFacade: TicketsFacade,
    route: ActivatedRoute,
    private router: Router
  ) {
    route.queryParams.subscribe(_ => (this.query_str = _.q));
    router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(_ => this.ticketsFacade.loadFilterTickets(this.query_str));
  }

  query() {
    this.router.navigate(["tickets"], {
      queryParams: { q: this.query_str },
      queryParamsHandling: "merge"
    });
  }

  // ngOnInit(): void {
  //   // this.ticketsFacade.mutations$.subscribe(_ => this.reset());

  //   // if (this.id !== null) {
  //   //   this.selectTicketById(this.id === "new" ? null : this.id);
  //   // }
  // }

  // reset() {
  //   this.loadFilterTickets();
  //   //this.selecteTicket(null);
  // }

  // loadFilterTickets() {
  //   this.ticketsFacade.loadFilterTickets(this.query_str);
  // }

  // selecteTicket(ticket: Ticket) {
  //   if (ticket !== null) this.router.navigate(["tickets", ticket.id]);
  //   //this.ticketsFacade.selectTicket(ticket);
  // }

  // selectTicketById(id: string) {
  //   this.ticketsFacade.selectTicketById(id);
  // }

  // loadTickets() {
  //   this.ticketsFacade.loadTickets();
  // }

  // creaateticket() {
  //   this.router.navigate(["tickets", "new"]);
  // }

  // saveTicket(ticket) {
  //   if (ticket.id !== null) {
  //     this.ticketsFacade.updateTicket(ticket);
  //   } else {
  //     this.ticketsFacade.createTicket(ticket);
  //   }
  //   this.router.navigate(["tickets"]);
  // }

  // deleteTicket(ticket) {
  //   this.ticketsFacade.deleteTicket(ticket);
  // }
}
