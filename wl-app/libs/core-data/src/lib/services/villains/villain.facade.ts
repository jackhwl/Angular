import { Injectable } from '@angular/core';
import { Villain } from '@wl/api-interfaces';
import { NotificationsService, VillainService } from '@wl/core-data';
import { Subject } from 'rxjs';

@Injectable()
export class VillainFacade {
  private allVillain = new Subject<Villain[]>();
  private selectedVillain = new Subject<Villain>();
  private mutations = new Subject();

  allVillain$ = this.allVillain.asObservable();
  selectedVillain$ = this.selectedVillain.asObservable();
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

  loadVillain() {
    this.villainService
      .getAll()
      .subscribe((villains: Villain[]) => this.allVillain.next(villains));
  }

  saveVillain(villain: Villain) {
    if (villain.id) {
      this.updateVillain(villain);
    } else {
      this.createVillain(villain);
    }
  }

  createVillain(villain: Villain) {
    return this.villainService.add(villain).subscribe(_ => {
      this.ns.emit('Villain created!');
      this.reset();
    });
  }

  updateVillain(villain: Villain) {
    return this.villainService.update(villain).subscribe(_ => {
      this.ns.emit('Villain updated!');
      this.reset();
    });
  }

  deleteVillain(villain: Villain) {
    return this.villainService.delete(villain).subscribe(_ => this.reset());
  }
}
