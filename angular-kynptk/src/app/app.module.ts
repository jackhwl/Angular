import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { QuizComponent } from './quiz/quiz.component';
import { QuestionComponent } from './question/question.component';
import { FakeApiProvider } from './services/fake.api.service';
import { QuizService } from './services/quiz.service';

@NgModule({
  imports:      [ BrowserModule, FormsModule, HttpClientModule ],
  declarations: [ AppComponent, HelloComponent, QuizComponent, QuestionComponent ],
  providers: [
    QuizService,
    FakeApiProvider
  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
