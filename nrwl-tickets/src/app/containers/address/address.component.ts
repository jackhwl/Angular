import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'vi-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddressComponent implements OnInit {
  @Input() formGroup: FormGroup;
  @Input() index: number;
  @Output() deleteAddress: EventEmitter<number> = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  delete(pa, index) {
    this.deleteAddress.emit(index);
  }

}
