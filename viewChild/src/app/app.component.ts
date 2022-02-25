import { Component, ViewChild } from '@angular/core';
import { SharkDirective } from './shark.directive';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  extraCreature!: string;

  @ViewChild(SharkDirective)
  set appShark(directive: SharkDirective) {
    this.extraCreature = directive.creature
  }

  ngAfterViewInit() {
    console.log(this.extraCreature)
  }
}
