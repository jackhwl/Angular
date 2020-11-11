# npx create-nx-workspace@10.3.2 fem-production-angular

# npx create-nx-workspace@10.3.2 fem-production-angular --appName=dashboard --preset=angular-next --npmScope=fem --linter=tslint --style=scss --nx-cloud=false

- yarn add concurrently --dev

# add these lines to package.json

    "serve:api": "nx run api:serve",
    "serve:web": "ng serve --open",
    "serve:all": "concurrently \"npm run serve:api\" \"npm run serve:web\" ",
