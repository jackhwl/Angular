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
