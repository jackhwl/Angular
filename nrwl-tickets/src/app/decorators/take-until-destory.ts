import { Subject } from "rxjs";

export function TakeUntilDestroy(constructor: Function): void {
  const originalDestroy = constructor.prototype.ngOnDestroy;
  if (typeof originalDestroy !== "function") {
    console.warn(
      `${constructor.name} is using @TakeUntilDestroy but does not implement OnDestroy`
    );
  }
  constructor.prototype.componentDestroy = function(): object {
    this._takeUntilDestroy$ = this._takeUntilDestroy$ || new Subject();
    return this._takeUntilDestroy$.asObservable();
  };
  constructor.prototype.ngOnDestroy = function(...args): void {
    if (typeof originalDestroy === "function") {
      originalDestroy.apply(this, args);
    }
    if (this._takeUntilDestroy$) {
      this._takeUntilDestroy$.next();
      this._takeUntilDestroy$.complete();
    }
  };
}
