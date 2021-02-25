import { NgModule } from '@angular/core';

import { SharedCommonModule } from '@vi/shared/common';
import { RouterModule } from '@angular/router';

import { BookAuthorsComponent } from './book-authors.component';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { BookPreviewComponent } from './book-preview/book-preview.component';
import { BookPreviewListComponent } from './book-preview-list.component';
import { BookSearchComponent } from './book-search/book-search.component';
import { PipesModule } from '../pipes';

export const COMPONENTS = [
  BookAuthorsComponent,
  BookDetailComponent,
  BookPreviewComponent,
  BookPreviewListComponent,
  BookSearchComponent
];

@NgModule({
  imports: [SharedCommonModule, RouterModule, PipesModule],
  declarations: COMPONENTS,
  exports: COMPONENTS
})
export class BooksComponentsModule {}
