import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppComponent } from "./app.component";

import { booksReducer } from "./state/books.reducer";
import { collectionReducer } from "./state/collection.reducer";
import { StoreModule } from "@ngrx/store";
import { HttpClientModule } from "@angular/common/http";
import { BookListComponent } from "./book-list/book-list.component";
import { BookCollectionComponent } from "./book-collection/book-collection.component";
import { EffectsModule } from "@ngrx/effects";
import { BooksEffects } from "./state/books.effects";

@NgModule({
  imports: [
    BrowserModule,
    StoreModule.forRoot({ books: booksReducer, collection: collectionReducer }),
    EffectsModule.forRoot([BooksEffects]),
    HttpClientModule
  ],
  declarations: [AppComponent, BookListComponent, BookCollectionComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}

/*
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://github.com/ngrx/platform
*/
