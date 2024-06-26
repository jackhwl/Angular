# npx create-nx-workspace@10.3.2 fem-production-angular

# npx create-nx-workspace@10.3.2 fem-production-angular --appName=dashboard --preset=angular-nest --npmScope=fem --linter=tslint --style=scss --nx-cloud=false

- yarn add concurrently --dev

# add these lines to package.json

    "serve:api": "nx run api:serve",
    "serve:web": "ng serve --open",
    "serve:all": "concurrently \"npm run serve:api\" \"npm run serve:web\" ",

# add angular material and ngrx store

- nx add @angular/material@10.2.7 --defaults=true --interactive=false
- nx add @ngrx/store@10.0.1 --defaults=true --interactive=false

# add Data Model BaseEntity & Widget

# generate core-data (communicate with server), core-state (managing the state of application) and material

- nx g lib core-data --parent-module=apps/dashboard/src/app/app.module.ts --routing --style=scss -d
- nx g lib core-state --parent-module=apps/dashboard/src/app/app.module.ts --routing --style=scss -d
- nx g lib material --parent-module=apps/dashboard/src/app/app.module.ts --routing --style=scss -d

# generate widgets services, routing

- nx g s services/widgets/widgets --project=core-data
- nx g m routing --flat=true --m=app.module.ts

# generate components

- nx g c widgets -m app.module.ts --style=scss
- nx g c widgets/widgets-list -m app.module.ts --style=scss
- nx g c widgets/widgets-details -m app.module.ts --style=scss

- nx g c home -m app.module.ts --style=scss

# angular.json, nx.json tsconfig.base.json
