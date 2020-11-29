import { Rule, SchematicContext, Tree, apply, mergeWith, template, url } from '@angular-devkit/schematics';

import { strings } from '@angular-devkit/core';

import { Schema } from './schema';

// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function hello(_options: Schema): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    
    const sourceTemplates = url('./files');

    const sourceParameterizedTemplates = apply(sourceTemplates, [
      template({
        ..._options,
        ...strings,
        addExclamation
      })
    ]);

    return mergeWith(sourceParameterizedTemplates)(tree, _context);
  };
}

function addExclamation(value: string):string {
  return value + '!';
}