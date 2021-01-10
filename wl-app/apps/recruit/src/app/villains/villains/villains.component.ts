import { Component, OnInit } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { Villain } from '@wl/api-interfaces';
import { VillainFacade } from '@wl/core-state';
import { filter, map } from 'rxjs/operators';
import { ToastService } from '@wl/core-data';

@Component({
  selector: 'app-villains',
  templateUrl: './villains.component.html',
  styleUrls: ['./villains.component.scss']
})
export class VillainsComponent implements OnInit {
  vm$ = combineLatest([
    this.villainFacade.villains$,
    this.villainFacade.loading$,
    this.villainFacade.selectedVillain$
  ]).pipe(
    filter(Boolean),
    map(([villains, loading, selectedVillain]) => ({
      villains,
      loading,
      selectedVillain
    }))
  );

  constructor(
    private villainFacade: VillainFacade,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    this.reset();
    this.villainFacade.mutations$.subscribe(_ => this.reset());
  }

  reset() {
    this.getVillains();
    this.selectVillain(null);
  }

  selectVillain(villain: Villain) {
    this.villainFacade.selectVillain(villain);
  }

  add(villain: Villain) {
    this.villainFacade.add(villain);
  }

  deleteVillain(villain: Villain) {
    this.villainFacade.delete(villain);
  }

  enableAddMode() {
    this.selectVillain(<Villain>{});
  }

  getVillains() {
    this.villainFacade.getAll();
  }

  update_cb(name) {
    this.toastService.open('i18.villains.villain_updated', 'PUT', { name });
  }

  update(villain: Villain) {
    this.villainFacade.update(villain, () => this.update_cb(villain.name));
  }
}
