# yarn add json-server --dev

# mkdir server && touch server/db.json

# generate item service

- nx g s services/items/items --project=core-data

# generate another application

- ng g app client --linter=tslint --style=scss --routing=false -d
- nx run client:serve
  "serve:client": "nx run client:serve --port=4400 --open",

# 2 apps share same widgetService

# generate shared lib

- nx g lib ui-toolbar --style=scss -d
- nx g c toolbar/tooolbar --project=ui-toolbar --style=scss -d

# yarn add uuid

# yarn add @nextjs/mapped-types

- nx g @nestjs/schematics:resource widgets --type rest --crud true --source-root apps/api/src

# yarn add @nestjs/swagger swagger-ui-express

# generate widgets state

- nx g @nrwl/angular:ngrx widgets --module=libs/core-state/src/lib/core-state.module.ts --directory widgets --defaults --facade -d
