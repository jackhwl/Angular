import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { Router } from "@angular/router";
import { Observable, Subscription } from "rxjs";
import { debounceTime, map } from "rxjs/operators";
import { TicketsFacade } from "../../services";

@Component({
  selector: "vi-tickets-root",
  templateUrl: "./tickets.component.html",
  styleUrls: ["./tickets.component.css"]
})
export class TicketsComponent implements OnInit, OnDestroy {
  error$ = this.ticketsFacade.error$;
  searchSetSub: Subscription | undefined;
  searchValueChangesSub: Subscription | undefined;
  search = new FormControl("");

  constructor(private ticketsFacade: TicketsFacade, private router: Router) {}

  ngOnInit() {
    this.searchSetSub = this.ticketsFacade.routerQueryParam$?.subscribe(_ =>
      this.search.setValue(_)
    );
    this.searchValueChangesSub = this.search.valueChanges
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

  ngOnDestroy() {
    if (this.searchSetSub) this.searchSetSub.unsubscribe();
    if (this.searchValueChangesSub) this.searchValueChangesSub.unsubscribe();
  }
}
