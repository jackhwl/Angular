import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { Villain } from '@wl/api-interfaces';

@Component({
  selector: 'app-villain-list',
  templateUrl: './villain-list.component.html',
  styleUrls: ['./villain-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VillainListComponent {
  @Input() villains: Villain[];
  @Input() selectedVillain: Villain;
  @Output() deleted = new EventEmitter<Villain>();
  @Output() selected = new EventEmitter<Villain>();

  byId(villain: Villain) {
    return villain.id;
  }

  select(villain: Villain) {
    this.selected.emit(villain);
  }
}
