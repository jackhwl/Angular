import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { SharedCommonModule } from '@vi/shared/common';

//import { fromBooks } from '@wl/core-state';
import * as fromBooks from './reducers';
import { BooksComponentsModule } from './components';
import { BooksRoutingModule } from './books-routing.module';
import { BookEffects } from './effects/book.effects';
import { CollectionEffects } from './effects/collection.effects';
import { FindBookPageComponent } from './containers/find-book-page.component';
import { ViewBookPageComponent } from './containers/view-book-page.component';
import { SelectedBookPageComponent } from './containers/selected-book-page.component';
import { CollectionPageComponent } from './containers/collection-page.component';
import { DBModule } from '@ngrx/db';
import { schema } from './db';

@NgModule({
  imports: [
    SharedCommonModule,
    BooksComponentsModule,
    BooksRoutingModule,

    /**
     * StoreModule.forFeature is used for composing state
     * from feature modules. These modules can be loaded
     * eagerly or lazily and will be dynamically added to
     * the existing state.
     */
    StoreModule.forFeature('books', fromBooks.reducers),

    /**
     * Effects.forFeature is used to register effects
     * from feature modules. Effects can be loaded
     * eagerly or lazily and will be started immediately.
     *
     * All Effects will only be instantiated once regardless of
     * whether they are registered once or multiple times.
     */
    EffectsModule.forFeature([BookEffects, CollectionEffects]),

    DBModule.provideDB(schema)
  ],
  declarations: [
    FindBookPageComponent,
    ViewBookPageComponent,
    SelectedBookPageComponent,
    CollectionPageComponent
  ]
})
export class BooksModule {}
