import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable, of } from 'rxjs';
import {
    debounceTime,
    distinctUntilChanged,
    map,
    shareReplay,
    switchMap,
    tap,
} from 'rxjs/operators';
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

export interface HeroRequestParams {
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

export const DEFAULT_LIMIT = LIMIT_LOW;
export const DEFAULT_SEARCH = '';
export const DEFAULT_PAGE = 0;
@Injectable({
    providedIn: 'root',
})
export class HeroService {
    limits = LIMITS;

    private searchBS = new BehaviorSubject<string>(DEFAULT_SEARCH);
    private limitBS = new BehaviorSubject<number>(DEFAULT_LIMIT);
    private pageBS = new BehaviorSubject<number>(DEFAULT_PAGE);
    private loadingBS = new BehaviorSubject(false);

    private heroesResponseCache = new Map();

    search$ = this.searchBS.asObservable();
    limit$ = this.limitBS.asObservable();
    //page$ = this.pageBS.asObservable();
    loading$ = this.loadingBS.asObservable();

    userPage$ = this.pageBS.pipe(map(p => p + 1));

    private params$: Observable<HeroRequestParams> = combineLatest([
        this.searchBS.pipe(debounceTime(500)),
        this.limitBS,
        this.pageBS.pipe(debounceTime(500)),
    ]).pipe(
        distinctUntilChanged(
            (prev, curr) => JSON.stringify(prev) === JSON.stringify(curr),
        ),
        map(([searchTerm, limit, page]) => {
            const params: HeroRequestParams = {
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
        tap(() => this.loadingBS.next(true)),
        switchMap(params => {
            const paramsAsStr = JSON.stringify(params);
            if (this.heroesResponseCache.has(paramsAsStr)) {
                return of(this.heroesResponseCache.get(paramsAsStr));
            }
            return this.http
                .get(HERO_API, {
                    params: new HttpParams({ fromObject: { ...params } }),
                })
                .pipe(
                    tap(res => this.heroesResponseCache.set(paramsAsStr, res)),
                );
        }),
        tap(() => this.loadingBS.next(false)),
        shareReplay(1),
    );

    heroes$: Observable<Hero[]> = this.heroesResponse$.pipe(
        map((res: any) => res.data.results),
    );

    totalResults$ = this.heroesResponse$.pipe(
        map((res: any) => res.data.total),
    );

    totalPages$ = combineLatest([this.totalResults$, this.limitBS]).pipe(
        map(([totalResults, limit]) => Math.ceil(totalResults / limit)),
    );

    constructor(private http: HttpClient) {}

    doSearch(term: string): void {
        this.searchBS.next(term);
        this.resetPage();
    }

    movePageBy(moveBy: number): void {
        const currentPage = this.pageBS.getValue();
        this.pageBS.next(currentPage + moveBy);
    }

    setLimit(newLimmit: number): void {
        this.limitBS.next(newLimmit);
        this.resetPage();
    }

    resetCache() {
        this.heroesResponseCache.clear();
    }

    private resetPage() {
        this.pageBS.next(DEFAULT_PAGE);
    }
}
