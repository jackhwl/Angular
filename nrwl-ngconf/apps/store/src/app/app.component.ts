import { Component } from '@angular/core';
import { getAllGames } from './fake-api';
import { formatRating } from '@nrwl-ngconf/store/util-formatters';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'bg-hoard-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private http: HttpClient) {}

  title = 'Board Game Hoard';
  formatRating = formatRating;
  games = this.http.get<any[]>('/api/games');
}
