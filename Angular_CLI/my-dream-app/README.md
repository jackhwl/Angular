npm i @angular/cli -g
ng new my-dream-app
ng serve
Angular CLI support any Node 8.x or higher, npm 5.x or higher
Always check angular.io for most up to date requirements
https://angular.io/guide/quickstart

ng version
npm list -g @angular/cli --depth=0
npm list -g --depth=0

ng new ngtest --skip-install
ng new ngtest --dry-run
ng nwe --help
ng new ngtest --style scss  
              --prefix vi  
              --skip-git  
              --skip-tests 
              --routing

ng new my-app --routing
              --prefix vi
              --style scss
              --dry-run

ng config schematics.@schematics/angular:component.styleext scss

ng lint my-app --help

ng lint my-app --format stylish

ng lint my-app --fix

ng generate component customer
ng g c customer
--flat
--inline-template    -t
--inline-style       -s
--spec
--view-encapsulation -v
--change-detection   -c
--dry-run            -d

generate directive 
ng g d search-box -d
ng g d search-box --flat false -d

ng g s sales-data -d
@Injectable({
  providedIn: 'root'
})

## generate models
ng g class models/customer -d
ng g cl models/customer -d

## generate interface
ng g i models/person

## generate enum
ng g enum models/gender
ng g e models/gender

## generate pipe
ng g pipe init-caps -d
ng g p shared/init-caps -d
ng g p shared/init-caps -m app.module

## generate modules
ng g m login --spec false -m app.module -d

## generate routing
ng g m sales --routing

## generate routing after application created
ng g m app --flat  --routing --force  -d

ng g m admin --routing -m app.module 
ng g c admin/users

ng g guard auth

# Building and Serving

ng build
runtime.js    WebPack runtime
main.js       App code
polyfills.js  Platform polyfills
styles.js     Styles
vendor.js     Angular and other vendor files

npm i webpack-bundle-analyzer --save-dev
ng build --stats-json  
npx webpack-bundle-analyzer dist/my-app/stats.json

npm i source-map-explorer --save-dev
ng build
npx source-map-explorer dist/my-app/main.js

||ng build|ng build --prod|
|-|-|-|
|Environment|environment.ts|environment.prod.ts|
|Cache-busting|only images referenced in css|all build files|
|Source maps|generated|not generated|
|Extracted CSS|global CSS output to .js|yes, to css files|
|Uglification|no|yes|
|Tree-Shaking|no|yes|
|AOT|no|yes| 
|Bundling|yes|yes|

ng build -help
ng b --prod --stats-json

npm run stats

ng serve --help
ng serve --port 8626 --live-reload false
ng server --prod -o

ng add @angular/pwa
ng add @angular/material
ng add @angular/elements
ng add @ng-bootstrap/schematics






This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.3.7.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
