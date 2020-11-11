# yarn add json-server --dev

# mkdir server && touch server/db.json

# generate item service

- nx g s services/items/items --project=core-data

# generate another application

- ng g app client --linter=tslint --style=scss --routing=false -d
- nx run client:serve
  "serve:client": "nx run client:serve --port=4400 --open",

# 2 apps share same widgetService

# generate shared component

- nx g lib ui-toolbar --style=scss -d
