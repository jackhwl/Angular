import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { interval, Observable, Subject, Subscription } from "rxjs";
import { debounce, map } from "rxjs/operators";
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
  querySub: Subscription | undefined;
  mutationSub: Subscription | undefined;

  constructor(private ticketsFacade: TicketsFacade, private router: Router) {}

  ngOnInit() {
    this.mutationSub = this.ticketsFacade.mutations$.subscribe(_ => {
      this.ticketsFacade.loadUsers();
      this.ticketsFacade.loadFilterTicketsByRoute();
    });
    this.querySub = this.subject
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
    if (this.querySub) this.querySub.unsubscribe();
    if (this.mutationSub) this.mutationSub.unsubscribe();
  }
}
