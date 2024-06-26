[Tiny Angular application projects in Nx workspaces](https://indepth.dev/posts/1185/tiny-angular-application-projects-in-nx-workspaces#extract-an-assets-workspace-library)
[Shell Library patterns with Nx and Monorepo Architectures](https://indepth.dev/posts/1117/the-shell-library-patterns-with-nx-and-monorepo-architectures)
[Sustainable Angular Architectures](https://www.angulararchitects.io/aktuelles/sustainable-angular-architectures-1/)

# Create an Nx workspace with an Angular application

- npx create-nx-workspace workspace --cli=angular --preset=angular --appName=tiny-app --style=scss

- nx update @angular/cli @angular/core

# Extract an assets workspace library

## Generate a clean workspace library

- nx generate library assets --directory=shared --tags="scope:shared,type:assets" --style=scss

npx rimraf ./apps/tiny-app/src/assets ./libs/shared/assets/_.js ./libs/shared/assets/_.json ./libs/shared/assets/src/_._ ./libs/shared/assets/src/lib

"# shared-assets" > ./libs/shared/assets/README.md

## Remove architect targets from the assets library.

## Set up common assets folders and move the favicon

- npx mkdirp ./libs/shared/assets/src/assets/fonts ./libs/shared/assets/src/assets/icons ./libs/shared/assets/src/assets/images

- "" > ./libs/shared/assets/src/assets/fonts/.gitkeep

- "" > ./libs/shared/assets/src/assets/icons/.gitkeep

- "" > ./libs/shared/assets/src/assets/images/.gitkeep

- mv ./apps/tiny-app/src/favicon.ico ./libs/shared/assets/src

## replace the assets options

```
            "assets": [
              "apps/tiny-app/src/favicon.ico",
              "apps/tiny-app/src/assets"
            ],
```

to

```
            "assets": [
              {
                "glob": "favicon.ico",
                "input": "libs/shared/assets/src",
                "output": "./"
              },
              {
                "glob": "**/*",
                "input": "libs/shared/assets/src/assets",
                "output": "assets"
              }
            ]
```

## Generate a clean workspace sass library

- nx generate library styles --directory=shared --tags="scope:shared,type:styles" --style=scss

- npx rimraf ./libs/shared/styles/_.js ./libs/shared/styles/_.json ./libs/shared/styles/src/_._ ./libs/shared/styles/src/lib/_._

- "# shared-styles" > ./libs/shared/styles/README.md
- mv ./apps/tiny-app/src/styles.scss ./libs/shared/styles/src/lib/\_global.scss

- "@import './lib/global';" > ./libs/shared/styles/src/index.scss

# Extract an environments workspace library

- nx generate library environments --directory=shared --tags="scope:shared,type:environments" --style=scss

- npx rimraf ./libs/shared/environments/src/lib/_._

## Add and configure NgRx Store

- nx add @ngrx/store --minimal false

- nx add @ngrx/store-devtools

## Extract a shared data access library

- nx generate library data-access --directory=shared --tags="scope:shared,type:data-access" --style=scss

- mv ./apps/tiny-app/src/app/reducers ./libs/shared/data-access/src/lib

## Add a development mode only meta reducer
