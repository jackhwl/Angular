import { Component, OnInit, OnDestroy, Input } from '@angular/core';
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
  @Input() counter: number = 0;
  score: number = 0;
  submitted: boolean = false;
  quizzes: Quiz[];
  guesses: Guess[] = [];
  subscription: Subscription;
  scoresub: Subscription;
  
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

  getScore() {
    this.scoresub = this.quizService.getScore(this.guesses)
        .subscribe(
        (data: number) => this.score = data,
        (error: QuizError) => this.loggerService.error(error.friendlyMessage),
        () => this.loggerService.log('complete')
      );
  }

  submit() {
    this.submitted = true;
    this.getScore();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.scoresub.unsubscribe();
  }

}
