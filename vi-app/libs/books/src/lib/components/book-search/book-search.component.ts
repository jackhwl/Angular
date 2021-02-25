import { Component, Output, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'vi-book-search',
  templateUrl: 'book-search.component.html',
  styleUrls: ['book-search.component.scss']
})
export class BookSearchComponent {
  @Input() query = '';
  @Input() searching = false;
  @Input() error = '';
  @Output() search = new EventEmitter<string>();
}
