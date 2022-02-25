import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appShark]'
})
export class SharkDirective {
  creature = 'Dolphin';

  constructor(elem: ElementRef, renderer: Renderer2) { 
    let shark = renderer.createText('Shark ')
    renderer.appendChild(elem.nativeElement, shark)
  }

}
