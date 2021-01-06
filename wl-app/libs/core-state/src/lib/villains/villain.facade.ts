import { Injectable } from '@angular/core';
import { Villain } from '@wl/api-interfaces';
import {
  NotificationsService,
  VillainService,
  VillainNgrxDataService
} from '@wl/core-data';
import { BehaviorSubject, Subject } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Injectable()
export class VillainFacade {
  private mutations = new Subject();
  private loading = new Subject<boolean>();
  private villains = new Subject<Villain[]>();
  private selectedVillain = new BehaviorSubject<Villain>(null);

  mutations$ = this.mutations.asObservable();
  loading$ = this.loading.asObservable();
  villains$ = this.villains.asObservable();
  selectedVillain$ = this.selectedVillain.asObservable();

  constructor(
    private villainService: VillainService,
    //VillainNgrxDataService,
    private ns: NotificationsService
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
      .pipe(finalize(() => this.loading.next(false)))
      .subscribe((villains: Villain[]) => this.villains.next(villains));
  }

  saveVillain(villain: Villain) {
    if (villain.id) {
      this.update(villain);
    } else {
      this.add(villain);
    }
  }

  add(villain: Villain) {
    this.loading.next(true);
    this.villainService
      .add(villain)
      .pipe(finalize(() => this.loading.next(false)))
      .subscribe(_ => {
        this.ns.emit('Villain created!');
        this.reset();
      });
  }

  update(villain: Villain) {
    this.loading.next(true);
    this.villainService
      .update(villain)
      .pipe(finalize(() => this.loading.next(false)))
      .subscribe(_ => {
        this.ns.emit('Villain updated!');
        this.reset();
      });
  }

  delete(villain: Villain) {
    this.loading.next(true);
    this.villainService
      .delete(villain)
      .pipe(finalize(() => this.loading.next(false)))
      .subscribe(_ => this.reset());
  }
}
