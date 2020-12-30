import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Villain } from '@wl/api-interfaces';
import { VillainFacade } from '@wl/core-state';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ModalComponent } from '../../modal/modal.component';

@Component({
  selector: 'app-villains',
  templateUrl: './villains.component.html',
  styleUrls: ['./villains.component.scss']
})
export class VillainsComponent implements OnInit {
  selectedVillain$: Observable<Villain> = this.villainFacade.selectedVillain$;
  villains$: Observable<Villain[]> = this.villainFacade.villains$;
  loading$: Observable<boolean> = this.villainFacade.loading$;

  constructor(public dialog: MatDialog, private villainFacade: VillainFacade) {}

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
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '250px';
    dialogConfig.data = {
      title: 'Delete Villain',
      message: `Do you want to delete ${villain.name}`
    };

    const dialogRef = this.dialog.open(ModalComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(deleteIt => {
      console.log('The dialog was closed');
      if (deleteIt) {
        this.villainFacade.delete(villain);
      }
    });
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
