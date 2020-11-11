import { Component, OnInit } from '@angular/core';
import { WidgetsService } from "@fem/core-data";
import { Widget } from "@fem/api-interfaces";
import { Observable } from 'rxjs';

@Component({
  selector: 'fem-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  widgets$: Observable<Widget[]>;

  constructor(private widgetsService: WidgetsService) { }
  
  ngOnInit(): void {
    this.widgets$ = this.widgetsService.all();
    console.log(this.widgets$);
  }
}
