import { Injectable } from '@angular/core';
import { Villain } from '@wl/api-interfaces';
import {
  VillainService,
  VillainNgrxDataService,
  ToastService
} from '@wl/core-data';
import { BehaviorSubject } from 'rxjs';
import { delay, finalize, tap } from 'rxjs/operators';

@Injectable()
export class VillainFacade {
  private mutations = new BehaviorSubject(null);
  private loading = new BehaviorSubject<boolean>(true);
  private villains = new BehaviorSubject<Villain[]>(null);
  private selectedVillain = new BehaviorSubject<Villain>(null);

  mutations$ = this.mutations.asObservable();
  loading$ = this.loading.asObservable();
  villains$ = this.villains.asObservable();
  selectedVillain$ = this.selectedVillain.asObservable();

  constructor(
    private villainService: VillainService,
    //VillainNgrxDataService,
    //private ns: NotificationsService,
    private toastService: ToastService
  ) {}

  reset() {
    this.mutations.next(true);
  }

  selectVillain(villain: Villain) {
    this.selectedVillain.next(villain);
  }

  getAll() {
    this.loading.next(true);
    this.villainService
      .getAll()
      .pipe(
        finalize(() => this.loading.next(false))
        //tap(() => this.toastService.open('i18.villains.villains_retrieved_successfully', 'GET')),
      )
      .subscribe((villains: Villain[]) => this.villains.next(villains));
  }

  saveVillain(villain: Villain) {
    if (villain.id) {
      this.update(villain);
    } else {
      this.add(villain);
    }
  }

  add(villain: Villain, cb?: any) {
    this.loading.next(true);
    this.villainService
      .add(villain)
      .pipe(
        finalize(() => this.loading.next(false)),
        tap(() =>
          cb
            ? cb()
            : this.toastService.open('i18.villains.villain_created', 'POST', {
                name: villain.name
              })
        )
      )
      .subscribe(_ => {
        //this.ns.emit('Villain created!');
        this.reset();
      });
  }

  update(villain: Villain, cb?: any) {
    this.loading.next(true);
    this.villainService
      .update(villain)
      .pipe(
        finalize(() => this.loading.next(false)),
        tap(() =>
          cb
            ? cb()
            : this.toastService.open('i18.villains.villain_updated', 'PUT', {
                name: villain.name
              })
        )
      )
      .subscribe(_ => {
        this.reset();
      });
  }

  delete(villain: Villain, cb?: any) {
    this.loading.next(true);
    this.villainService
      .delete(villain)
      .pipe(
        finalize(() => this.loading.next(false)),
        tap(() =>
          cb
            ? cb()
            : this.toastService.open('i18.villains.villain_deleted', 'DELETE', {
                name: villain.name
              })
        )
      )
      .subscribe(_ => this.reset());
  }
}
