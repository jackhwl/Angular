import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app.routing.module';

import { AppComponent } from './app.component';
import { QuizComponent } from './quiz/quiz.component';
import { QuestionComponent } from './question/question.component';
import { QuizService, LoggerService, QuizErrorHandlerService, FakeApiProvider } from './services';

@NgModule({
  imports:      [ BrowserModule, FormsModule, HttpClientModule, AppRoutingModule ],
  declarations: [ AppComponent, QuizComponent, QuestionComponent ],
  providers: [
    LoggerService,
    QuizService,
    FakeApiProvider,
    { provide: ErrorHandler, useClass: QuizErrorHandlerService }
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
