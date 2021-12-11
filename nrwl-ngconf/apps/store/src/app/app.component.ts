import { Component } from '@angular/core';
import { formatRating } from '@nrwl-ngconf/store/util-formatters';
import { HttpClient } from '@angular/common/http';
import { Game } from '@nrwl-ngconf/util-interface';
//import { sendNotification } from '@nrwl-ngconf/api-util-notifications';

@Component({
  selector: 'nrwl-ngconf-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private http: HttpClient) {}

  title = 'Board Game Hoard';
  formatRating = formatRating;
  games = this.http.get<Game[]>('/api/games');
}
