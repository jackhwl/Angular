import { Component } from '@angular/core';
import { LoggerService } from 'my-lib';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-dream-app';

  constructor(logger: LoggerService){
    logger.log('hello angular');
  }
}
