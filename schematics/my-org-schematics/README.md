# Getting Started With Schematics

https://medium.com/@tomastrajan/total-guide-to-custom-angular-schematics-5c50cf90cdb4
https://www.youtube.com/watch?v=M5YSPas3qFo
46:28
https://developer.okta.com/blog/2019/02/13/angular-schematics
This repository is a basic Schematic implementation that serves as a starting point to create and publish Schematics to NPM.

### Testing

To test locally, install `@angular-devkit/schematics-cli` globally and use the `schematics` command line tool. That tool acts the same as the `generate` command of the Angular CLI, but also has a debug mode.

Check the documentation with

```bash
schematics --help
```

### Unit Testing

`npm run test` will run the unit tests, using Jasmine as a runner and test framework.

### Publishing

To publish, simply do:

```bash
npm run build
npm publish
```

That's it!

https://developer.okta.com/blog/2019/02/13/angular-schematics#run-your-schematics-with-angular-cli
now create 2 files from hello2 is working, but update doesn't, use --force
in schematics\my-test-app
ng g hello2:hello2 --force

## generate .d.ts file

npx -p dtsgenerator dtsgen schema.json -o schema.d.ts

## create a file

cd hello2
schematics blank --name=add
npm run build
schematics .:add --name=test --debug=false

ng g hello2:callsca --sourceDir=/src/app --name=mike
