import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { Hero } from '@wl/api-interfaces';
import { HeroService } from '@wl/core-data';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {
  selected: Hero;
  heroes$: Hero[];
  loading$: boolean;
  // heroes$: Observable<Hero[]>;
  // loading$: Observable<boolean>;

  constructor(private heroService: HeroService) {
    // this.heroes$ = heroService.entities$;
    // this.loading$ = heroService.loading$;
  }

  ngOnInit() {
    this.getHeroes();
  }

  add(hero: Hero) {
    this.heroService.add(hero);
    // this.loading = true;
    // this.heroService
    //   .add(hero)
    //   .pipe(finalize(() => (this.loading = false)))
    //   .subscribe(addedHero => (this.heroes = this.heroes.concat(addedHero)));
  }

  close() {
    this.selected = null;
  }

  delete(hero: Hero) {
    this.heroService.delete(hero);
    this.close();
    // this.loading = true;
    // this.close();
    // this.heroService
    //   .delete(hero)
    //   .pipe(finalize(() => (this.loading = false)))
    //   .subscribe(
    //     () => (this.heroes = this.heroes.filter(h => h.id !== hero.id))
    //   );
  }

  enableAddMode() {
    this.selected = <any>{};
  }

  getHeroes() {
    this.heroService.getAll();
    this.close();
    // this.loading = true;
    // this.heroService
    //   .getAll()
    //   .pipe(finalize(() => (this.loading = false)))
    //   .subscribe(heroes => (this.heroes = heroes));
    // this.close();
  }

  select(hero: Hero) {
    this.selected = hero;
  }

  update(hero: Hero) {
    this.heroService.update(hero);
    //   this.loading = true;
    //   this.heroService
    //     .update(hero)
    //     .pipe(finalize(() => (this.loading = false)))
    //     .subscribe(
    //       () =>
    //         (this.heroes = this.heroes.map(h => (h.id === hero.id ? hero : h)))
    //     );
  }
}
