import { Component } from '@angular/core';

@Component({
  template: `
    <h1>404 - PAGE NOT FOUND!</h1>
    <h3>The page you are looking for might have been removed had its name changed or is temporarily unavailable.</h3>
    <section>
    <article>
        <span>
            <button [routerLink]="['/welcome']" title="Go To HomePage">
                GO TO HOMEPAGE
            </button>
        </span>
    </article>
</section>
    `
})
export class PageNotFoundComponent { }
