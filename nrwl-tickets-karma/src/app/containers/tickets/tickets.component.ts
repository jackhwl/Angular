import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit
} from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { Observable, Subscription } from "rxjs";
import {
  debounceTime,
  distinctUntilChanged,
  map,
  switchMap
} from "rxjs/operators";
import { TicketsFacade } from "../../services";

@Component({
  selector: "vi-tickets-root",
  templateUrl: "./tickets.component.html",
  styleUrls: ["./tickets.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TicketsComponent implements OnInit, OnDestroy {
  error$ = this.ticketsFacade.error$;
  routerRouteParamId$ = this.ticketsFacade.routerRouteParamId$;
  searchSetSub: Subscription | undefined;
  searchValueChangesSub: Subscription | undefined;
  search = new FormControl("");

  constructor(private ticketsFacade: TicketsFacade, private router: Router) {}

  ngOnInit(): void {
    this.searchSetSub = this.ticketsFacade.routerQueryParam$?.subscribe(_ =>
      this.search.setValue(_)
    );
    this.searchValueChangesSub = this.search.valueChanges
      .pipe(
        debounceTime(200),
        distinctUntilChanged(),
        switchMap((q: string) =>
          this.router.navigate(["tickets"], {
            queryParams: { q },
            queryParamsHandling: "merge"
          })
        )
      )
      .subscribe();
  }

  // debounceMap(delay: number) {
  //   return function<T>(source: Observable<T>) {
  //     return source.pipe(
  //       debounceTime(200),
  //     distinctUntilChanged(),
  //     switchMap();
  //     )}
  // }

  ngOnDestroy(): void {
    if (this.searchSetSub) this.searchSetSub.unsubscribe();
    if (this.searchValueChangesSub) this.searchValueChangesSub.unsubscribe();
  }
}
