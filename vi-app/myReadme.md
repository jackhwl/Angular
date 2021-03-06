- npx create-nx-workspace vi-app --cli=angular --preset=angular --appName=tiny-app --style=scss
- nx generate library environments --directory=shared --tags="scope:shared,type:environments" --style=scss
- npx rimraf ./libs/shared/environments/src/lib/_._
  mv ./apps/tiny-app/src/environments/_._ ./libs/shared/environments/src/lib

"export \* from './lib/environment';" > ./libs/shared/environments/src/index.ts

npx rimraf ./apps/tiny-app/src/environments

## Custom Material Modules

npm i @angular/material
nx generate library custom-material --directory=common/ui --style=scss

## assets

nx generate library assets --directory=shared --tags="scope:shared,type:assets" --style=scss

## styles

nx generate library styles --directory=shared --tags="scope:shared,type:styles" --style=scss

npx rimraf ./libs/shared/styles/_.js ./libs/shared/styles/_.json ./libs/shared/styles/src/_._ ./libs/shared/styles/src/lib/_._

"# shared-styles" > ./libs/shared/styles/README.md

mv ./apps/tiny-app/src/styles.scss ./libs/shared/styles/src/lib/\_global.scss

"@import './lib/global';" > ./libs/shared/styles/src/index.scss

## index.scss content has invisible charactors need remove

## add slogan lib

nx g lib slogan --directory=shared/ui --style=scss  
https://www.youtube.com/watch?v=esDbHZ2tbhg
https://www.youtube.com/watch?v=_QU0mpyF7bQ&t=545s
https://indepth.dev/posts/1117/the-shell-library-patterns-with-nx-and-monorepo-architectures
https://creately.com/ Your Visual Workspace
https://duncanhunter.gitbook.io/enterprise-angular-applications-with-ngrx-and-nx/introduction/3-generating-components-and-nx-lib

## add api-interfaces lib

nx g lib api-interfaces --style=scss --skipTests

## add shared-common module

nx g lib common --style=scss --skipTests --directory=shared

## add webpack-bundle-analyzer

- nx build --prod --stats-json
- yarn add webpack-bundle-analyzer --dev

https://ngrx.io/guide/router-store/configuration
https://subscription.packtpub.com/book/application_development/9781787288904/2/ch02lvl1sec12/url-format
https://indepth.dev/posts/1206/understanding-the-magic-behind-ngrx-effects
https://indepth.dev/posts/1199/understanding-the-magic-behind-ngrx-store

add store-devtools
npm i @ngrx/store-devtools --save-dev
https://subscription.packtpub.com/book/application_development/9781787288904/2/ch02lvl1sec17/activating-components

## add students lib

nx g lib students --style=scss
students config use service no state in Redux tool

## add villains lib

nx g lib villains --style=scss
