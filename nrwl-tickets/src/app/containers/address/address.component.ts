import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { UtilService } from 'src/app/services';

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
  constructor(private service: UtilService) { }

  ngOnInit(): void {
  }

  delete(pa, index) {
    this.deleteAddress.emit(index);
  }
  
  deletePhone(pa: FormArray, id: number) {
    pa.removeAt(id);
  }

  addPhone(pa: FormArray) {
    const ep = this.service.getEmptyPhoneFG();
    ep.addControl('addressId', new FormControl(this.formGroup.value.id));
    pa.push(ep)
  }

}
