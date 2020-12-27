import { Component } from '@angular/core';

@Component({
  selector: 'wl-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {
  labTitle = 'ngrx-data-lab';
  labState = 'traditional angular app';
}
