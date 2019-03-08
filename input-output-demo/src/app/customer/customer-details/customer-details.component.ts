import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css'],
  // When using OnPush detectors, then the framework will check an OnPush
  // component when any of its input properties changes, when it fires
  // an event, or when an observable fires an event ~ Victor Savkin (Angular Team)

  // OnPush cause change detection to run when:
  // 1. An input property reference changes
  // 2. An output property/EventEmitter or DOM event fires
  // 3. Async pipe receives an event
  // 4. Change detection is manually invoked via ChangeDetectorRef 
  //
  // OnPush Benefits:
  // 1. Performance (component isn't checkout until OnPush conditions are met)
  // 2. Prevent the presentation component from updating state 
  //    it should get from the container/parent

  changeDetection: ChangeDetectionStrategy.OnPush

})
export class CustomerDetailsComponent implements OnInit {
  @Input() customer: any;
  @Output() customerChanged = new EventEmitter<any>();
  constructor() { }

  ngOnInit() {
    this.customer.name = 'Gina Done';
    setTimeout(() => {
      this.customer.name = 'Tina Doe';
    }, 2000);
  }

  change() {
    this.customer.name = 'Michelle Doe';
    this.customerChanged.emit(this.customer);
  }

}
