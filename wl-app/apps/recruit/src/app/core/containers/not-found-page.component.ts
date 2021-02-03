import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'wl-not-found-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './not-found-page.component.html',
  styles: [
    `
      :host {
        text-align: center;
      }
    `
  ]
})
export class NotFoundPageComponent {}
