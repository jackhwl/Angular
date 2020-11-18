import { Component, OnInit } from '@angular/core';
import { fromEvent } from 'rxjs';
import { map, pairwise, switchMap, takeUntil } from 'rxjs/operators';
import * as $ from 'jquery';

interface Line {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

@Component({
  selector: 'app-annotate',
  styles: [
    `
      mat-card {
        width: 400px;
        box-sizing: border-box;
        margin: 16px;
      }

      .card-container {
        position: fixed;
        top: 70px;
        bottom: 0;
        display: flex;
        flex-flow: row wrap;
      }
    `,
  ],
  template: `
    <div class="card-container">
      <mat-card>
        <app-line *ngFor="let line of lines" [line]="line"></app-line>
        <app-doc></app-doc>
      </mat-card>
    </div>
  `,
})
export class AnnotateComponent implements OnInit {
  lines: Line[] = [];

  ngOnInit() {
    const mouseDown$ = fromEvent(document, 'mousedown');
    const mouseMove$ = fromEvent(document, 'mousemove');
    const mouseUp$ = fromEvent(document, 'mouseup');

    mouseDown$
      .pipe(switchMap(event => mouseMove$
        .pipe(
          map((e: MouseEvent) => this.generatePosition(e)),
          pairwise(),
          map(([oldPos, newPos]) => this.generateCoordinates(oldPos, newPos)),
          takeUntil(mouseUp$)
        )))
      .subscribe((line: any) => this.lines = [...this.lines, line]);
  }

  generatePosition(e: MouseEvent) {
    const offset = $(e.target).offset();
    return {
      x: e.clientX - offset.left,
      y: e.pageY - offset.top
    };
  }

  generateCoordinates(start, end): Line {
    return { x1: start.x, y1: start.y, x2: end.x, y2: end.y };
  }
}
