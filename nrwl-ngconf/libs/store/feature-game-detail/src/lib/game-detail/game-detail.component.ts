import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { map, switchMap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { formatRating } from '@nrwl-ngconf/store/util-formatters';
import { Game } from '@nrwl-ngconf/util-interface';

@Component({
  selector: 'nrwl-ngconf-game-detail',
  templateUrl: './game-detail.component.html',
  styleUrls: ['./game-detail.component.css']
})
export class GameDetailComponent {
  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  game$ = this.route.paramMap.pipe(
    map((params: ParamMap) => params.get('id')),
    switchMap(id => this.http.get<Game>(`/api/games/${id}`))
  );

  formatRating = formatRating;
}
