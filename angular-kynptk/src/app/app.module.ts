import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app.routing.module';

import { AppComponent } from './app.component';
import { QuizComponent } from './quiz/quiz.component';
import { QuestionComponent } from './question/question.component';
import { QuizService, LoggerService, QuizErrorHandlerService, FakeApiProvider } from './services';
import { WelcomeComponent } from './welcome/welcome.component';
import { PageNotFoundComponent } from './page-not-found.component';
import { ScoreComponent } from './score/score.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  imports:      [ BrowserModule, FormsModule, HttpClientModule, AppRoutingModule ],
  declarations: [ AppComponent, WelcomeComponent, ScoreComponent, FooterComponent, PageNotFoundComponent, QuizComponent, QuestionComponent ],
  providers: [
    LoggerService,
    QuizService,
    FakeApiProvider,
    { provide: ErrorHandler, useClass: QuizErrorHandlerService }
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
