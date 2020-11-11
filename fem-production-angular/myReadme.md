# npx create-nx-workspace@10.3.2 fem-production-angular

# npx create-nx-workspace@10.3.2 fem-production-angular --appName=dashboard --preset=angular-next --npmScope=fem --linter=tslint --style=scss --nx-cloud=false

- yarn add concurrently --dev

# add these lines to package.json

    "serve:api": "nx run api:serve",
    "serve:web": "ng serve --open",
    "serve:all": "concurrently \"npm run serve:api\" \"npm run serve:web\" ",

# add angular material and ngrx store

- nx add @angular/material@10.2.7 --defaults=true --interactive=false
- nx add @ngrx/store@10.0.1 --defaults=true --interactive=false

# add Data Model BaseEntity & Widget

# generate core-data (talk to server), core-state and material

- nx g lib core-data --parent-module=apps/dashboard/src/app/app.module.ts --routing --style=scss -d
- nx g lib core-state --parent-module=apps/dashboard/src/app/app.module.ts --routing --style=scss -d
- nx g lib material --parent-module=apps/dashboard/src/app/app.module.ts --routing --style=scss -d

# generate widgets services, routing

- nx g s services/widgets/widgets --project=core-data
- nx g m routing --flat=true --m=app.module.ts
