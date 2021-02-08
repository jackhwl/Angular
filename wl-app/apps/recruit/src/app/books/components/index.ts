import { NgModule } from '@angular/core';

import { SharedModule } from '@wl/shared';
import { RouterModule } from '@angular/router';

import { BookAuthorsComponent } from './book-authors.component';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { BookPreviewComponent } from './book-preview/book-preview.component';
import { BookPreviewListComponent } from './book-preview-list.component';
import { BookSearchComponent } from './book-search/book-search.component';
import { PipesModule } from '@wl/core-data';

export const COMPONENTS = [
  BookAuthorsComponent,
  BookDetailComponent,
  BookPreviewComponent,
  BookPreviewListComponent,
  BookSearchComponent
];

@NgModule({
  imports: [SharedModule, RouterModule, PipesModule],
  declarations: COMPONENTS,
  exports: COMPONENTS
})
export class BooksComponentsModule {}
