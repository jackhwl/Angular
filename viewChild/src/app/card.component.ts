import { Component, ContentChild, ContentChildren, ElementRef, Renderer2,  ViewChild } from '@angular/core';

@Component({
  selector: 'card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent  {
  @ContentChild("header") cardContentHeader!: ElementRef;
  
  constructor(private renderer: Renderer2) { }

  ngAfterContentInit() {
   
    this.renderer.setStyle(this.cardContentHeader.nativeElement,"font-size","20px")
  
  }
}
