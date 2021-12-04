import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { HeroService } from '../../services/hero.service';

@Component({
    selector: 'rx-hero-table',
    templateUrl: './hero-table.component.html',
    styleUrls: ['./hero-table.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroTableComponent implements OnDestroy {
    vm$ = combineLatest([
        this.hero.heroes$,
        this.hero.search$,
        this.hero.userPage$,
        this.hero.limit$,
        this.hero.totalResults$,
        this.hero.totalPages$,
        this.hero.loading$,
    ]).pipe(
        map(
            ([
                heroes,
                search,
                page,
                limit,
                totalResults,
                totalPages,
                loading,
            ]) => {
                return {
                    heroes,
                    search,
                    page,
                    limit,
                    totalResults,
                    totalPages,
                    loading,
                    disableNext: totalPages === page,
                    disablePrev: page === 1,
                };
            },
        ),
    );

    constructor(public hero: HeroService) {}

    doSearch(event: any) {
        this.hero.doSearch(event.target.value);
    }

    movePageBy(moveBy) {
        this.hero.movePageBy(moveBy);
    }

    setLimit(limmit) {
        this.hero.setLimit(limmit);
    }

    ngOnDestroy() {
        this.hero.resetCache();
    }
}
