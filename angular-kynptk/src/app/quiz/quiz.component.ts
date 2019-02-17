import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Quiz, Guess } from "../models";

import { QuizService } from '../services/quiz.service';


@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit, OnDestroy {

  counter: number = 0;
  score: number = 0;
  quizzes: Quiz[];
  guesses: Guess[] = [];
  subscription: Subscription;


  constructor(private quizService: QuizService) { }
  
  ngOnInit() {
    // this.dataService.getAllBooks()
    //   .subscribe(
    //     (data: Book[]) => this.allBooks = data,
    //     (err: BookTrackerError) => console.log(err.friendlyMessage),
    //     () => console.log('All done getting books.')
    //   );
    // let resolvedData: Quiz[] | BookTrackerError = this.route.snapshot.data['resolvedBooks'];
    // if (resolvedData instanceof BookTrackerError) {
    //   console.log(`Dashboard component error: ${resolvedData.friendlyMessage}`);
    // } else {
    //   this.allBooks = resolvedData;
    // }

    // this.subscription = this.quizService.getAllQuizzes()
    //     .subscribe(
    //     (data: Quiz[]) => this.quizzes = data,
    //     (error) => console.error(error),
    //     () => console.log('complete')
    //     //(err: QuizError) => console.log('error ===>', err.friendlyMessage),
    //     //() => this.loggerService.log('All done getting readers!')
    //   );

      this.subscription = this.quizService.getAllQuizzes1()
      .subscribe(
      (data: any) => this.quizzes = data,
      (error) => console.error(error),
      () => console.log('complete')
      //(err: QuizError) => console.log('error ===>', err.friendlyMessage),
      //() => this.loggerService.log('All done getting readers!')
    );
    //this.mostPopularBook = this.dataService.mostPopularBook;

  }

  updateGuess (event: Guess) {
    this.guesses = this.guesses.filter(guess=> guess.questionId !== event.questionId);
    this.guesses.push(event);
  }

  getScore() {
    console.log('aaa');
    const subscription = this.quizService.getScore(this.guesses)
        .subscribe(
        (data: number) => this.score = data,
        (error) => console.error(error),
        () => console.log('complete')
        //(err: QuizError) => console.log('error ===>', err.friendlyMessage),
        //() => this.loggerService.log('All done getting readers!')
      );
    this.subscription.add(subscription);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
