import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Villain } from '@wl/api-interfaces';
import { VillainFacade } from '@wl/core-state';

@Component({
  selector: 'app-villains',
  templateUrl: './villains.component.html',
  styleUrls: ['./villains.component.scss']
})
export class VillainsComponent implements OnInit {
  selectedVillain$: Observable<Villain> = this.villainFacade.selectedVillain$;
  villains$: Observable<Villain[]> = this.villainFacade.villains$;
  loading$: Observable<boolean> = this.villainFacade.loading$;

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

  delete(villain: Villain) {
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
