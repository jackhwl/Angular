import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Villain } from '@wl/api-interfaces';
import { VillainFacade } from '@wl/core-data';

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
    // //this.villainService.add(villain);
    // this.loading = true;
    // this.villainService
    //   .add(villain)
    //   .pipe(finalize(() => (this.loading = false)))
    //   .subscribe(
    //     addedvillain => (this.villains = this.villains.concat(addedvillain))
    //   );
  }

  // close() {
  //   this.selected = null;
  // }

  delete(villain: Villain) {
    this.villainFacade.delete(villain);
    // //this.villainService.delete(villain);
    // //this.close();
    // this.loading = true;
    // this.close();
    // this.villainService
    //   .delete(villain)
    //   .pipe(finalize(() => (this.loading = false)))
    //   .subscribe(
    //     () => (this.villains = this.villains.filter(h => h.id !== villain.id))
    //   );
  }

  enableAddMode() {
    this.selectedVillain$ = <any>{};
  }

  getVillains() {
    this.villainFacade.getAll();
    //this.close();
    // // this.villainService.getAll();
    // // this.close();
    // this.loading = true;
    // this.villainService
    //   .getAll()
    //   .pipe(finalize(() => (this.loading = false)))
    //   .subscribe(villains => (this.villains = villains));
    // this.close();
  }

  update(villain: Villain) {
    this.villainFacade.update(villain);
    // //this.villainService.update(villain);
    // this.loading = true;
    // this.villainService
    //   .update(villain)
    //   .pipe(finalize(() => (this.loading = false)))
    //   .subscribe(
    //     () =>
    //       (this.villains = this.villains.map(h =>
    //         h.id === villain.id ? villain : h
    //       ))
    //   );
  }
}
