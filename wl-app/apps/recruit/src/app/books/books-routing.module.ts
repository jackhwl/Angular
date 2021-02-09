import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FindBookPageComponent } from './containers/find-book-page.component';
import { ViewBookPageComponent } from './containers/view-book-page.component';
import { BookExistsGuard } from '@wl/core-state';
import { CollectionPageComponent } from './containers/collection-page.component';

export const routes: Routes = [
  { path: 'find', component: FindBookPageComponent },
  {
    path: ':id',
    component: ViewBookPageComponent,
    canActivate: [BookExistsGuard]
  },
  { path: '', component: CollectionPageComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BooksRoutingModule {}
