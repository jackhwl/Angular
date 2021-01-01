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

[OnPush](https://blog.angular-university.io/onpush-change-detection-how-it-works/)
[OnPush 2](https://blog.angular-university.io/how-does-angular-2-change-detection-really-work/)
[Angular Architecture - Smart Components vs Presentational Components](https://blog.angular-university.io/angular-2-smart-components-vs-presentation-components-whats-the-difference-when-to-use-each-and-why/)
