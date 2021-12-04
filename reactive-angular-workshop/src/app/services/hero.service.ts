import { HttpClient, HttpParams } from '@angular/common/http';
import { fn } from '@angular/compiler/src/output/output_ast';
import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { debounceTime, map, shareReplay, switchMap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

export interface Hero {
    id: number;
    name: string;
    description: string;
    thumbnail: HeroThumbnail;
    resourceURI: string;
    comics: HeroSubItems;
    events: HeroSubItems;
    series: HeroSubItems;
    stories: HeroSubItems;
}

export interface HeroThumbnail {
    path: string;
    extendion: string;
}

export interface HeroSubItems {
    available: number;
    returned: number;
    collectionURI: string;
    items: HeroSubItem[];
}

export interface HeroSubItem {
    resourceURI: string;
    name: string;
}

export interface HeroQueryParams {
    apikey: string;
    limit: number;
    offset: number;
    nameStartsWith?: string; // cannot be empty
}

// The URL to the Marvel API
const HERO_API = `${environment.MARVEL_API.URL}/v1/public/characters`;

// Our Limits for Search
const LIMIT_LOW = 10;
const LIMIT_MID = 25;
const LIMIT_HIGH = 100;
const LIMITS = [LIMIT_LOW, LIMIT_MID, LIMIT_HIGH];

const DEFAULT_LIMIT = LIMIT_LOW;
const DEFAULT_SEARCH = '';
const DEFAULT_PAGE = 0;
@Injectable({
    providedIn: 'root',
})
export class HeroService {
    limits = LIMITS;

    searchBS = new BehaviorSubject<string>(DEFAULT_SEARCH);
    limitBS = new BehaviorSubject<number>(DEFAULT_LIMIT);
    pageBS = new BehaviorSubject<number>(DEFAULT_PAGE);

    userPage$ = this.pageBS.pipe(map(p => p + 1));

    private params$ = combineLatest([
        this.searchBS,
        this.limitBS,
        this.pageBS,
    ]).pipe(
        map(([searchTerm, limit, page]) => {
            const params: HeroQueryParams = {
                apikey: environment.MARVEL_API.PUBLIC_KEY,
                limit: +`${limit}`,
                offset: +`${page * limit}`, // page * limit
            };
            if (searchTerm.length) {
                params.nameStartsWith = searchTerm;
            }

            return params;
        }),
    );

    private heroesResponse$ = this.params$.pipe(
        debounceTime(500),
        switchMap(params =>
            this.http.get(HERO_API, {
                params: new HttpParams({ fromObject: { ...params } }),
            }),
        ),
        shareReplay(1),
    );

    heroes$: Observable<Hero[]> = this.heroesResponse$.pipe(
        map((res: any) => res.data?.results),
    );

    totalResults$ = this.heroesResponse$.pipe(
        map((res: any) => res.data?.total),
    );

    totalPages$ = combineLatest([this.totalResults$, this.limitBS]).pipe(
        map(([totalResults, limit]) => Math.ceil(totalResults / limit)),
    );

    constructor(private http: HttpClient) {}
}
