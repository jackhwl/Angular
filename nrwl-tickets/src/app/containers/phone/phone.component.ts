import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from "@angular/core";
import { FormGroup } from "@angular/forms";

@Component({
  selector: "vi-phone",
  templateUrl: "./phone.component.html",
  styleUrls: ["./phone.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PhoneComponent implements OnInit {
  @Input() formGroup: FormGroup;
  @Input() index: number;
  @Output() deletePhone: EventEmitter<number> = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}

  delete(id) {
    this.deletePhone.emit(id);
  }
}
