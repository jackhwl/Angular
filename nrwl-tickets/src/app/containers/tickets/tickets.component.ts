import { Component, OnDestroy, OnInit } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { interval, Observable, Subject, Subscription } from "rxjs";
import { debounce, filter, map } from "rxjs/operators";
import { TicketsFacade } from "../../services";

@Component({
  selector: "vi-tickets-root",
  templateUrl: "./tickets.component.html",
  styleUrls: ["./tickets.component.css"]
})
export class TicketsComponent implements OnInit, OnDestroy {
  error$: Observable<any> = this.ticketsFacade.error$;
  q$: Observable<any> = this.ticketsFacade.q$;
  subject = new Subject();
  sub: Subscription;

  constructor(private ticketsFacade: TicketsFacade, private router: Router) {
    this.router.events
      ?.pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(_ => {
        this.ticketsFacade.loadUsers();
        this.ticketsFacade.loadFilterTicketsByRoute();
      });
  }

  ngOnInit() {
    this.sub = this.subject
      .pipe(
        debounce(() => interval(200)),
        map(q =>
          this.router.navigate(["tickets"], {
            queryParams: { q },
            queryParamsHandling: "merge"
          })
        )
      )
      .subscribe();
  }

  query(q) {
    this.subject.next(q);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
