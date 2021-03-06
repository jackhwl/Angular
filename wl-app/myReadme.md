https://frontendmasters.com/workshops/production-angular/
Part 3: 8:40
https://medium.com/@tomastrajan/total-guide-to-custom-angular-schematics-5c50cf90cdb4
https://frontendmasters.com/courses/angular-reactive/state-shape-initial-state-reducer/

schematics ..\schematics\my-org-schematics\src\collection.json:crud-resource dashboard/user-roles --url /api/user --project dashboard --debug=false --findOne --force
ng g ..\schematics\my-org-schematics\src\collection.json:crud-resource dashboard/user-role --url /api/user --project dashboard --findOne --force

[Angular-ngrx-material-starter](https://github.com/tomastrajan/angular-ngrx-material-starter)
[Security 1](https://www.codemag.com/Article/1805021/Security-in-Angular-Part-1)
[Security 3](https://www.codemag.com/Article/1811031/Security-in-Angular-Part-3)
[JWT .net core 5.0](https://codeburst.io/jwt-auth-in-asp-net-core-148fb72bed03)

# schematics

npm install -g @angular-devkit/schematics-cli

# windows only

npm install -g json
json -I -f package.json -e 'this.scripts.foo="bar"'

# Book Clean Code & Refactoring

##

- npx create-nx-workspace@10.3.2 wl-app

##

- npx create-nx-workspace@10.3.2 wl-app --appName=recruit --preset=angular-nest --npmScope=wl --linter=tslint --style=scss --nx-cloud=false

## yarn add concurrently --dev

## add these lines to package.json

```
    "serve:api": "nx run api:serve",
    "serve:web": "ng serve --open",
    "serve:all": "concurrently \"npm run serve:api\" \"npm run serve:web\" ",
```

# Verify from:

- npm run serve:all
- http://localhost:3333/api/hello
- http://localhost:4200

angular.json -> recruit -> architect -> serve -> options -> "proxyConfig": "apps/recruit/proxy.conf.json"
doesn't work with json-server, work with @nrwl/nest
https://nx.dev/latest/angular/tutorial/05-add-node-app

## add angular material and ngrx store

- nx add @angular/material@10.2.7 --defaults=true --interactive=false
- nx add @ngrx/store@10.0.1 --defaults=true --interactive=false

## add Data Model BaseEntity & Student

# generate core-data (communicate with server), core-state (managing the state of application) and material

- nx g lib core-data --parent-module=apps/recruit/src/app/app.module.ts --routing --style=scss -d
- nx g lib core-state --parent-module=apps/recruit/src/app/app.module.ts --routing --style=scss -d
- nx g lib material --parent-module=apps/recruit/src/app/app.module.ts --routing --style=scss -d

# generate students services, routing

- nx g s services/students/students --project=core-data
- nx g m routing --flat=true --m=app.module.ts

# generate components

- nx g c students -m app.module.ts --style=scss
- nx g c students/students-list -m app.module.ts --style=scss
- nx g c students/student-details -m app.module.ts --style=scss

- nx g c home -m app.module.ts --style=scss

# angular.json, nx.json tsconfig.base.json

# copy material module content, remove storeModule and core-data routing

# add Routing, home page layout

# export studentService in core-data index.ts

# DI studentService to studentComponent

- yarn add json-server --dev

# create server/db.json

# move enviorment to lib

# use httpClient in studentsService

# use Observable in student component

# fix layout not 100% issue by rename tag name in style.scss (wl-root)

# toggle sidebar, title

# student CRUD service

# student component crud

# debug avoid use innerText use textContent instead, mockService

## angular9 form.valid invalid, move save action to form tag

# generate lazy load login module, login component

- nx g m login --routing -d
- nx g c login -d

# testing service

# generate notifications service

- nx g s notifications/notifications --project=core-data -d

# anaalyzing bundle size

- nx build --prod --stats-json
- yarn add webpack-bundle-analyzer --dev

# add header component

- nx g c header -m app.module.ts --style=scss --skipTests

# add sive nav list component

- nx g c sidenav-list -m app.module.ts --style=scss --skipTests

# add student state

# generate facade

- nx g @nrwl/angular:ngrx students --module=libs/core-state/src/lib/core-state.module.ts --directory students --defaults --facade -d

# fix tests

# fenerate testing module

- nx g lib core-state --parent-module=apps/recruit/src/app/app.module.ts --routing --style=scss -d

# partial-application

https://stackblitz.com/edit/partial-application

# add ngx-translate

- yarn add @ngx-translate/core @ngx-translate/http-loader --save

# add security app

- nx g app security --style=scss --routing -d

# add login component

- nx g c security/login --flat --skipTests -d

# add route Guard

- nx g g security/auth --flat --skipTests -d

# add Todo WebApi backend for api/product

# add System.IdentityModel.Tokens.Jwt and Microsoft.AspNetCore.Authentication.JwtBearer two packages

# add httpInterceptor module

-nx g m security/httpInterceptor -m app.module --flat

# Create Structural Directive to Check Claim

-nx g d security/hasClaim --flat -d

# ngrx/data

https://github.com/johnpapa/ngrx-data-lab/blob/master/README.md

# move ngrx-data to wl-app

# add ngrxData app

- nx g app ngrxData --style=scss --routing -d

# add toolbar component

-nx g c toolbar -m app.module.ts --style=scss --skipTests -d

# add angular-in-memory-web-api

- yarn add angular-in-memory-web-api

# add heroes, villains module

- nx g m heroes -d
- nx g m villains -d

# add newsletter component for this onPush article

- [OnPush](https://blog.angular-university.io/onpush-change-detection-how-it-works/)
- [OnPush 2](https://blog.angular-university.io/how-does-angular-2-change-detection-really-work/)
- [Angular Architecture - Smart Components vs Presentational Components](https://blog.angular-university.io/angular-2-smart-components-vs-presentation-components-whats-the-difference-when-to-use-each-and-why/)
- [Angular Architecture - Container vs Presentational Components Common Design Pitfalls](https://blog.angular-university.io/angular-component-design-how-to-avoid-custom-event-bubbling-and-extraneous-properties-in-the-local-component-tree/)
- [How to build Angular apps using Observable Data Services - Pitfalls to avoid](https://blog.angular-university.io/how-to-build-angular2-apps-using-rxjs-observable-data-services-pitfalls-to-avoid/)
- [How To Debug RxJs - A Simple Way For Debugging Rxjs Observables](https://blog.angular-university.io/debug-rxjs/)
- [Angular Service Layers: Redux, RxJs and Ngrx Store - When to Use a Store And Why?](https://blog.angular-university.io/angular-2-redux-ngrx-rxjs/)
- [Ngrx Store - An Architecture Guide](https://blog.angular-university.io//angular-ngrx-store-and-effects-crash-course/)

## [RxJS in Angular: Reactive Development](https://app.pluralsight.com/library/courses/rxjs-angular-reactive-development/table-of-contents)

- [Code](https://github.com/deborahk/angular-rxjs)
- of('Apple1', 'Apple2')
- from(['Apple1', 'Apple2'])

### Observable

- Any stream of data

### Observer

- Observes the stream
- Methods to process notifications from the stream: next(), error(), complete()

### Subscriber

- An Observer that can unsubscribe

### Subscription

- Represents the execution of an Observable
- subscribe() returns a Subscription

## Stopping an Observable

- Call complete() on the Observer
- Use a creation function that completes: of, from, ...
- Use an operator that completes: take, ...
- Throw an error
- Call unsubscribe() on the Subscription

## RxJS Operators

- tap
- map
- take

## Going Reactive

### catchError

- RxJS Operator
- Catches any errors that occur on an Obseraable
- catchError(this.handleError)
- Used for catching errors and
  - Rethrowing an erroor
  - Or replacing the errored Obserable to continue after an error occurs

### throwError

- RxJS Creation Function
- Creates an Observable that emits no items And immediately emits an error notification **throwError(err)**, Used for
  Propagating an error
- Creates an Observable that emits no items **Obserable\<never\>** Immediately emits an error notification

![alt text](../Angular-RxJS/src/assets/images/commonPattern.PNG 'commonPattern')
![alt text](../Angular-RxJS/src/assets/images/DeclaraativePattern.PNG 'commonPattern')

## Combining Streams

### combineLatest

- Static creation function, not a pipeable operator
- Creates an Observable whose values are defined:
  - Using the latest values from each input Obsservable
  - combineLatest([a$, b$, c$])

### forkJoin

- Static creation function, not a pipeable operator
- Creates an Observable whose value is defined
  - Using the **last** value from each input Observable
  - forkJoin([a$, b$, c$])
- When all input streams complete
  - Emits a value to the output stream
  - And completes

### withLatestFrom

- Pipeable operator
- Creates an Observable whose values are defined
  - Using the latest values from each input Observable
  - But only when the source stream emits
  - a$.pipe(withLatestFrom(b$, c\$))
- to react to changes in only one stream
- to regulate the output of the other streams

### merge and scan

- Static creation function, not a pipeable operator
- Combines multiple streams byy merging their emissions
- merge(a$, b$, c\$)
- Combining sequences of similar types to blend their emitted values

### shareReplay

## Higer-order Mapping Operators

### concatMap, mergeMap

## start to add security/login component to villians

# generate shared module

- nx g lib shared --parent-module=apps/recruit/src/app/app.module.ts --style=scss -d

## shared module contain translate, material

## [token in memorry](https://freddycorly.medium.com/mocking-backend-with-angular-in-memory-api-c238b73ddb98)

## login based on security module,

## add local-storage service with localStorageChanges\$

## back to store basic (espicially selector) angular reactive workshop

- createFeatureSelector & createSelector

- ![ngrx flow](tools/ngrx.png 'flow')
- Reducers use actions to change state. Effects are used to listen for actions and return new actions
- All actions hit all reducers first, then the action is passed to the effects
- reducer and store for state management, effects for flow control

## [Using DataPersistence](https://blog.nrwl.io/using-ngrx-4-to-manage-state-in-angular-applications-64e7a1f84b7b)

## add jobs module, jobs-list component

- nx g m jobs -d; nx g c jobs/jobs-list -m jobs -d

# generate job state and facade

- nx g @nrwl/angular:ngrx jobs --module=libs/core-state/src/lib/core-state.module.ts --directory jobs --defaults --facade -d

## generate lib ui-slogan and slogan component under it

- nx g lib ui-slogan --style=scss -d
- nx g c slogan/slogan --project=ui-slogan -d

## review ngrx doc

- ![ngrx flow 2](tools/state-management-lifecycle.png 'flow')
  [Tutorial 1](https://stackblitz.com/edit/angular-mhj1du?file=src%2Fapp%2Fmy-counter%2Fmy-counter.component.ts)
- action props item just a label, can be anything

```
  export const retrievedBookList = createAction(
    "[Book List/API] Retrieve Books Success",
    props<{ asdf_books }>()
  );
```

[Selector](https://ultimatecourses.com/blog/ngrx-store-understanding-state-selectors)

- job service facade vs job store facade
- [Enterprise Angular applications with ngrx](https://duncanhunter.gitbooks.io/enterprise-angular-applications-with-ngrx-and-nx/content/chapter1.html)
  https://github.com/ngrx/platform/tree/master/projects/example-app
  https://timdeschryver.dev/blog/clean-ngrx-reducers-using-immer
  https://medium.com/angular-in-depth/simple-state-mutations-in-ngxs-with-immer-48b908874a5e
  https://www.codemag.com/Article/1811061/Angular-and-the-Store#:~:text=The%20structure%20is%20self%2Dexplanatory,state%20together%20with%20the%20reducers.

# notification in effect

## move app.component to core/container folder, navigation folder to core folder

## add ngrx-store-freeze

- yarn add ngrx-store-freeze --dev

## add job routing, default load job module

https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-oauth2-client-creds-grant-flow

# nx dep-graph

https://www.youtube.com/watch?v=gt44dtkgzPQ&t=847s
https://indepth.dev/posts/1185/tiny-angular-application-projects-in-nx-workspaces
https://indepth.dev/posts/1117/the-shell-library-patterns-with-nx-and-monorepo-architectures
