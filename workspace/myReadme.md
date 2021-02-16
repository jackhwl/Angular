# Create an Nx workspace with an Angular application

- npx create-nx-workspace workspace --cli=angular --preset=angular --appName=tiny-app --style=scss

- nx update @angular/cli @angular/core

# Extract an assets workspace library

## Generate a clean workspace library

- nx generate library assets --directory=shared --tags="scope:shared,type:assets" --style=scss

npx rimraf ./apps/tiny-app/src/assets ./libs/shared/assets/_.js ./libs/shared/assets/_.json ./libs/shared/assets/src/_._ ./libs/shared/assets/src/lib

"# shared-assets" > ./libs/shared/assets/README.md

## Remove architect targets from the assets library.
