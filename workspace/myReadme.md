[Tiny Angular application projects in Nx workspaces](https://indepth.dev/posts/1185/tiny-angular-application-projects-in-nx-workspaces#extract-an-assets-workspace-library)

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
