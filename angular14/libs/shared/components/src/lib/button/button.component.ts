import { Component, OnInit, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'angular14-button',
  template: ` <button
  class="
     inline-flex
     items-center
     justify-center
     px-5
     py-5
     border
     border-transparent
     text-base
     font-medium
     rounded-md
     text-white
     bg-indigo-600
     hover:bg-indigo-700
     "
>
 <ng-content></ng-content>
</button> `,
  styles: [],
})
export class ButtonComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}

@NgModule({
  imports: [CommonModule],
  declarations: [ButtonComponent],
  exports: [ButtonComponent],
})
export class ButtonComponentModule {}
