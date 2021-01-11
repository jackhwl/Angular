import { Injectable } from '@angular/core';
import { Villain } from '@wl/api-interfaces';
import {
  VillainService,
  VillainNgrxDataService,
  ToastService
} from '@wl/core-data';
import { BehaviorSubject, pipe } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';

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
  nfs = {
    getAll: {
      i18n_key: 'i18.villains.villains_retrieved_successfully',
      action: 'GET'
    },
    add: {
      i18n_key: 'i18.villains.villain_created',
      action: 'POST'
    },
    update: {
      i18n_key: 'i18.villains.villain_updated',
      action: 'PUT'
    },
    delete: {
      i18n_key: 'i18.villains.villain_deleted',
      action: 'DELETE'
    }
  };

  constructor(
    private villainService: VillainService,
    //VillainNgrxDataService,
    private toastService: ToastService
  ) {}

  notification(type: string, name: string, cb?: any) {
    cb
      ? cb()
      : this.toastService.open(this.nfs[type].i18n_key, this.nfs[type].action, {
          name
        });
  }

  villainFinalize = (type: string, name: string, cb?: any) =>
    pipe(
      finalize(() => this.loading.next(false)),
      tap(() => this.notification(type, name, cb))
    );

  reset() {
    this.mutations.next(true);
  }

  selectVillain(villain: Villain) {
    this.selectedVillain.next(villain);
  }

  getAll(cb?: any) {
    this.loading.next(true);
    this.villainService
      .getAll()
      .pipe(this.villainFinalize('getAll', '', cb))
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
      .pipe(this.villainFinalize('add', villain.name, cb))
      .subscribe(_ => this.reset());
  }

  update(villain: Villain, cb?: any) {
    this.loading.next(true);
    this.villainService
      .update(villain)
      .pipe(this.villainFinalize('update', villain.name, cb))
      .subscribe(_ => this.reset());
  }

  delete(villain: Villain, cb?: any) {
    this.loading.next(true);
    this.villainService
      .delete(villain)
      .pipe(this.villainFinalize('delete', villain.name, cb))
      .subscribe(_ => this.reset());
  }
}
