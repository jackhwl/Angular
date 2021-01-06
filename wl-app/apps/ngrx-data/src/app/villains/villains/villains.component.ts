import { Component, OnInit } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { Villain } from '@wl/api-interfaces';
import { VillainFacade } from '@wl/core-state';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-villains',
  templateUrl: './villains.component.html',
  styleUrls: ['./villains.component.scss']
})
export class VillainsComponent implements OnInit {
  private selectedVillain$: Observable<Villain> = this.villainFacade
    .selectedVillain$;
  private villains$: Observable<Villain[]> = this.villainFacade.villains$;
  private loading$: Observable<boolean> = this.villainFacade.loading$;

  vm$ = combineLatest([
    this.villains$,
    this.loading$,
    this.selectedVillain$
  ]).pipe(
    filter(Boolean),
    map(([villains, loading, selectedVillain]) => ({
      villains,
      loading,
      selectedVillain
    }))
  );

  constructor(private villainFacade: VillainFacade) {}

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

  update(villain: Villain) {
    this.villainFacade.update(villain);
  }
}
