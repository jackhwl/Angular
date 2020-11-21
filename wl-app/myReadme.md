https://frontendmasters.com/workshops/production-angular/
Part 3: 8:40

# Book Clean Code & Refactoring

## npx create-nx-workspace@10.3.2 wl-app

## npx create-nx-workspace@10.3.2 wl-app --appName=recruit --preset=angular-nest --npmScope=wl --linter=tslint --style=scss --nx-cloud=false

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
