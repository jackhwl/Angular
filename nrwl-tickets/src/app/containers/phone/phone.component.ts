import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from "@angular/core";
import { FormGroup } from "@angular/forms";

@Component({
  selector: "vi-phone",
  templateUrl: "./phone.component.html",
  styleUrls: ["./phone.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PhoneComponent {
  @Input() formGroup: FormGroup;
  @Input() index: number;
  @Output() deletePhone: EventEmitter<number> = new EventEmitter<number>();
  constructor() {}

  delete() {
    this.deletePhone.emit(this.index);
  }
}
