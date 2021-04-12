// This file is required by karma.conf.js and loads recursively all the .spec and framework files

import "zone.js/dist/zone-testing";
import { getTestBed } from "@angular/core/testing";
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from "@angular/platform-browser-dynamic/testing";

declare const require: {
  context(
    path: string,
    deep?: boolean,
    filter?: RegExp
  ): {
    keys(): string[];
    <T>(id: string): T;
  };
};

// First, initialize the Angular testing environment.
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting()
);
// Then we find all the tests.
// ng test --include=**/containers/tickets/*.spec.ts
const context = require.context("./", true, /\.spec\.ts$/);
// const context = require.context(
//   "./",
//   true,
//   /\/app\/containers\/ticket-details\/ticket-details\.component\.spec\.ts$/
// );
// const context = require.context(
//   "./",
//   true,
//   /\/app\/containers\/tickets\/tickets\.component\.spec\.ts$/
// );
// const context = require.context(
//   "./",
//   true,
//   /\/app\/containers\/tickets\/tickets\.component\.spec\.ts$/
// );

//And load the modules.
context.keys().map(context);
