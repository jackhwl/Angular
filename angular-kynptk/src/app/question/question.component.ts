import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Quiz, Guess } from "../models";

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})

export class QuestionComponent {
    @Input() quiz: Quiz;
    @Input() sequence: number;
    @Output() updateGuess: EventEmitter<Guess> = new EventEmitter();
    checkedValue: string = '';
    optionChange (event: any) {
        this.checkedValue = event.target.value;
        this.updateGuess.emit({
            questionId: this.quiz.questionId,
            answer: event.target.value
        });
    }
}
