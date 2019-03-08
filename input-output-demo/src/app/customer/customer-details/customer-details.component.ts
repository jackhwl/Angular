import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css']
})
export class CustomerDetailsComponent implements OnInit {
  @Input() customer: any;
  @Output() customerChanged = new EventEmitter<any>();
  constructor() { }

  ngOnInit() {
  }

  change() {
    this.customer.name = 'Michelle Doe';
    this.customerChanged.emit(this.customer);
  }

}
