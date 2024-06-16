import { Directive, ElementRef, Provider, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const DATE_VALUE_PROVIDER: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() =>DateValueAccessorDirective),
  multi: true
}

@Directive({
  selector: 'input([type=date])[formControlName],input([type=date])[formControl],input([type=date])[ngModel]',
  providers: [DATE_VALUE_PROVIDER]
})
export class DateValueAccessorDirective implements ControlValueAccessor {

  constructor(private element: ElementRef) { }

  writeValue(newValue: any): void {
    if (newValue instanceof Date) {
      //yyyy-mm-dd
      this.element.nativeElement.value = newValue.toISOString().split('T')[0]
    }
  }

}
