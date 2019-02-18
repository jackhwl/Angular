import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { Quiz, Guess, QuizError } from "../models";
import { QuizService, LoggerService } from '../services';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit, OnDestroy {
  counter: number = 0;
  viewedAll: boolean = false;
  quizzes: Quiz[];
  guesses: Guess[] = [];
  subscription: Subscription;
  
  constructor(private quizService: QuizService, private loggerService: LoggerService, private router: Router) { }
  
  ngOnInit() {
      this.subscription = this.quizService.getAllQuizzes()
      .subscribe(
      (data: any) => this.quizzes = data,
      (error: QuizError) => this.loggerService.error(error.friendlyMessage),
      () => this.loggerService.log('complete')
    );
  }

  updateGuess (event: Guess) {
    this.guesses = this.guesses.filter(guess=> guess.questionId !== event.questionId);
    this.guesses.push(event);
  }

  submit() {
    this.quizService.guesses = this.guesses;
    this.router.navigate(['/score']);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
