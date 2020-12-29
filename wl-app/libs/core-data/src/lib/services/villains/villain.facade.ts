import { Injectable } from '@angular/core';
import { Villain } from '@wl/api-interfaces';
import { NotificationsService, VillainService } from '@wl/core-data';
import { Subject } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Injectable()
export class VillainFacade {
  private villains = new Subject<Villain[]>();
  private selectedVillain = new Subject<Villain>();
  private loading = new Subject<boolean>();
  private mutations = new Subject();

  villains$ = this.villains.asObservable();
  selectedVillain$ = this.selectedVillain.asObservable();
  loading$ = this.loading.asObservable();
  mutations$ = this.mutations.asObservable();

  constructor(
    private villainService: VillainService,
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
      this.updateVillain(villain);
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

  updateVillain(villain: Villain) {
    this.loading.next(true);
    this.villainService
      .update(villain)
      .pipe(finalize(() => this.loading.next(false)))
      .subscribe(_ => {
        this.ns.emit('Villain updated!');
        this.reset();
      });
  }

  deleteVillain(villain: Villain) {
    this.loading.next(true);
    this.villainService
      .delete(villain)
      .pipe(finalize(() => this.loading.next(false)))
      .subscribe(_ => this.reset());
  }
}
