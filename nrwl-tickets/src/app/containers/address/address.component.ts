import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { UtilService } from 'src/app/services';

@Component({
  selector: 'vi-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddressComponent {
  @Input() formGroup: FormGroup;
  @Input() index: number;
  @Output() deleteAddress: EventEmitter<number> = new EventEmitter();
  constructor(private service: UtilService) { }

  delete() {
    this.deleteAddress.emit(this.index);
  }
  
  deletePhone(index: number) {
    const pa = this.formGroup.controls.phones as FormArray
    pa.removeAt(index);
  }

  addPhone() {
    console.log('addPhone clicked')
    const pa = this.formGroup.controls.phones as FormArray
    console.log(pa.length)
    const ep = this.service.getEmptyPhoneFG();
    ep.addControl('addressId', new FormControl(this.formGroup.value.id));
    pa.push(ep)
    console.log(pa.length)
  }

}
