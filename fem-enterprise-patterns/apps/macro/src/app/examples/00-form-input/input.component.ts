import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { fromEvent } from 'rxjs';
import { map } from 'rxjs/internal/operators';

@Component({
  selector: 'app-input',
  template: `
    <mat-form-field class="search">
      <input
        name="search"
        [formControl]="searchControl"
        type="search"
        matInput
        placeholder="Search Query"
      />
    </mat-form-field>
    <h3>{{ queryString }}</h3>
  `,
  styles: [
    `
      .search {
        width: 100%;
        max-width: 500px;
        margin-left: 15px;
      }
    `,
  ],
})
export class InputComponent implements OnInit {
  searchControl: FormControl = new FormControl('');
  queryString;

  ngOnInit() {
    this.searchControl.valueChanges
    .pipe(
      map(value => value.toUpperCase()),
      map(value => value.split('').reverse().join('')),
      map(value => encodeURI(value))
    )
    .subscribe(result => this.queryString = result);
  }
}
