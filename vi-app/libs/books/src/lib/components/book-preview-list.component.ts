import { Component, Input } from '@angular/core';
import { Book } from '../models/books';

@Component({
  selector: 'vi-book-preview-list',
  template: `
    <vi-book-preview *ngFor="let book of books" [book]="book"></vi-book-preview>
  `,
  styles: [
    `
      :host {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
      }
    `
  ]
})
export class BookPreviewListComponent {
  @Input() books: Book[];
}
