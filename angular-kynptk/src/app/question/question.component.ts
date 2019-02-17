import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Quiz, Guess } from "../models";

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})

export class QuestionComponent {
    @Input() quiz: Quiz;
    @Output() updateGuess: EventEmitter<Guess> = new EventEmitter();

    optionChange (event: any) {
        this.updateGuess.emit({
            questionId: this.quiz.questionId,
            answer: event.target.value
        });
    }
}
