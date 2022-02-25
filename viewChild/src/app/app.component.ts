import { Component, ElementRef, ViewChild } from '@angular/core';
import { PupComponent } from './pup.component';
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
  
  @ViewChild('someInput') someInput!: ElementRef;

  @ViewChild(PupComponent) pup!: PupComponent;
  
  ngAfterViewInit() {
    console.log(this.extraCreature)
    this.someInput.nativeElement.value = 'Whale!';
    console.log(this.pup.whoAmI());
  }
}
