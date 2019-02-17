import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { QuizComponent } from "./quiz/quiz.component";

const routes: Routes = [
  { path: 'quiz', component: QuizComponent }, //, resolve: {resolvedBooks: BooksResolverService}
  { path: '', redirectTo: 'quiz', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
