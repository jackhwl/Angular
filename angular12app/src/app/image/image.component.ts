import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent implements OnInit {
  @Input()
  imgSrc: string = '<UPDATE IMAGE URL>';

  @Input()
  altTxt?: string = 'Pondicherry French Hotel';

  @Input()
  figCaptionTxt?: string = 'The French Quarter or White Town area in Pondicherry is filled with e'
  
  constructor() { }

  ngOnInit(): void {
  }

}
