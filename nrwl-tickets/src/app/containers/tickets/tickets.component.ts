import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit
} from "@angular/core";
import { FormControl } from "@angular/forms";
import { select, Store } from "@ngrx/store";
import { Observable, Subscription } from "rxjs";
import {
  debounceTime,
  distinctUntilChanged,
  switchMap,
  takeUntil,
} from "rxjs/operators";
import { TicketListPageActions } from "src/app/actions";
import { TakeUntilDestroy } from "src/app/decorators/take-until-destory";
import {
  selectQueryParam,
  selectRouteParam
} from "src/app/reducers/router.selectors";
import * as TicketsSelectors from "../../reducers/ticket.selectors";

@Component({
  selector: "vi-tickets-root",
  templateUrl: "./tickets.component.html",
  styleUrls: ["./tickets.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
@TakeUntilDestroy
export class TicketsComponent implements OnInit, OnDestroy {
  private componentDestroy: () => Observable<unknown>;

  error$: Observable<string | null> = this.store.pipe(
    select(TicketsSelectors.getError)
  );
  routerRouteParamId$: Observable<string> = this.store.pipe(
    select(selectRouteParam("id"))
  );
  routerQueryParam$: Observable<string> = this.store.pipe(
    select(selectQueryParam("q"))
  );

  searchSetSub: Subscription | undefined;
  searchValueChangesSub: Subscription | undefined;
  search = new FormControl("");

  constructor(private store: Store<{}>) {}

  ngOnInit(): void {
    this.searchSetSub = this.routerQueryParam$
      ?.pipe(takeUntil(this.componentDestroy()))
      .subscribe(_ => this.search.setValue(_));
    this.searchValueChangesSub = this.search.valueChanges
      .pipe(
        debounceTime(200),
        distinctUntilChanged(),
        switchMap((q: string) => [
          this.store.dispatch(TicketListPageActions.filterParamChanged({q}))
        ]),
        takeUntil(this.componentDestroy())
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
    // if (this.searchSetSub) this.searchSetSub.unsubscribe();
    // if (this.searchValueChangesSub) this.searchValueChangesSub.unsubscribe();
  }
}
