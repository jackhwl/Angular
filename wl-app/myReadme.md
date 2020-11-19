https://frontendmasters.com/workshops/production-angular/
Part 2:

# Book Clean Code & Refactoring

## npx create-nx-workspace@10.3.2 wl-app

## npx create-nx-workspace@10.3.2 wl-app --appName=recruit --preset=angular-nest --npmScope=wl --linter=tslint --style=scss --nx-cloud=false

## yarn add concurrently --dev

## package.json

```
    "serve:api": "nx run api:serve",
    "serve:web": "ng serve --open",
    "serve:all": "concurrently \"npm run serve:api\" \"npm run serve:web\" ",
```

# Verify from:

- npm run serve:all
- http://localhost:3333/api/hello
- http://localhost:4200
