import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { QuizComponent } from "./quiz/quiz.component";
import { WelcomeComponent } from './welcome/welcome.component';
import { PageNotFoundComponent } from './page-not-found.component';
import { ScoreComponent } from './score/score.component';
import { QuizResolver } from './services/quiz.resolver.service';

const routes: Routes = [
  { path: 'welcome', component: WelcomeComponent }, 
  { path: 'quiz', component: QuizComponent, resolve: { resolvedQuizzes: QuizResolver } }, 
  { path: 'score', component: ScoreComponent }, 
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
