import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { Router } from "@angular/router";
import { interval, Observable, Subject, Subscription } from "rxjs";
import { debounce, debounceTime, map } from "rxjs/operators";
import { TicketsFacade } from "../../services";

@Component({
  selector: "vi-tickets-root",
  templateUrl: "./tickets.component.html",
  styleUrls: ["./tickets.component.css"]
})
export class TicketsComponent implements OnInit, OnDestroy {
  q$: Observable<string> = this.ticketsFacade.q$;
  error$: Observable<string | null> = this.ticketsFacade.error$;
  subject = new Subject<string>();
  qbSub: Subscription | undefined;
  querySub: Subscription | undefined;
  mutationSub: Subscription | undefined;
  qb = new FormControl("");

  constructor(private ticketsFacade: TicketsFacade, private router: Router) {}

  ngOnInit() {
    this.qbSub = this.q$.subscribe(_ => this.qb.setValue(_));
    this.mutationSub = this.ticketsFacade.mutations$.subscribe(_ => {
      console.log("motation");
      this.ticketsFacade.loadUsers();
      this.ticketsFacade.loadFilterTicketsByRoute();
    });

    this.querySub = this.qb.valueChanges
      .pipe(
        debounceTime(200),
        map((q: string) =>
          this.router.navigate(["tickets"], {
            queryParams: { q },
            queryParamsHandling: "merge"
          })
        )
      )
      .subscribe();
  }

  // query(q: string) {
  //   this.router.navigate(["tickets"], {
  //     queryParams: { q },
  //     queryParamsHandling: "merge"
  //   })
  //   //this.subject.next(q);
  // }

  ngOnDestroy() {
    if (this.qbSub) this.qbSub.unsubscribe();
    if (this.querySub) this.querySub.unsubscribe();
    if (this.mutationSub) this.mutationSub.unsubscribe();
  }
}
