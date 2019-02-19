import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Quiz, Guess, QuizError } from "../models";
import { LoggerService } from '../services';
import { QuizService } from '../services';

@Component({
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit, OnDestroy {
  counter: number = 0;
  viewedAll: boolean = false;
  quizzes: Quiz[];
  guesses: Guess[] = [];

  constructor(private route: ActivatedRoute, private quizService: QuizService, private loggerService: LoggerService, private router: Router) { }
  
  ngOnInit() {
      const resolvedQuizzes = this.route.snapshot.data['resolvedQuizzes'];
      if (resolvedQuizzes instanceof QuizError) {
        this.loggerService.error(resolvedQuizzes.friendlyMessage)
      } else {
        this.quizzes = resolvedQuizzes;
      }
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

  }

}
