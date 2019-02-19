import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { QuizError } from "../models";
import { QuizService, LoggerService } from '../services';

@Component({
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.css']
})
export class ScoreComponent implements OnInit, OnDestroy {
  score: number = 0;
  calculated: boolean = false;
  subscription: Subscription;
  
  constructor(private quizService: QuizService, private loggerService: LoggerService) { }
  
  ngOnInit() {
    this.subscription = this.quizService.getScore()
        .subscribe(
        (data: number) => { this.calculated = true; this.score = data},
        (error: QuizError) => this.loggerService.error(error.friendlyMessage)
      );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
