- npx create-nx-workspace vi-app --cli=angular --preset=angular --appName=tiny-app --style=scss
- nx generate library environments --directory=shared --tags="scope:shared,type:environments" --style=scss
- npx rimraf ./libs/shared/environments/src/lib/_._
  mv ./apps/tiny-app/src/environments/_._ ./libs/shared/environments/src/lib

"export \* from './lib/environment';" > ./libs/shared/environments/src/index.ts

npx rimraf ./apps/tiny-app/src/environments

## Custom Material Modules

npm i @angular/material
nx generate library custom-material --directory=common/ui --style=scss
