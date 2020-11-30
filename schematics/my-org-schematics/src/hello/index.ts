import { apply, mergeWith, Rule, SchematicContext, template, Tree, url } from '@angular-devkit/schematics';
import { strings } from '@angular-devkit/core';
import { Schema } from './schema';

export function hello(_options: Schema): Rule {
  return (tree: Tree, _context: SchematicContext) => {

    // const name = _options.name;
    const sourceTemplate = url('./files');
    const sourceParameterizedTemplates = apply(sourceTemplate, [
      template({
        ..._options, 
        ...strings
      })
    ])

    tree = mergeWith(sourceParameterizedTemplates)(tree, _context) as Tree;
    //tree.create('hello.js', `console.log('Hello ${name}')`);

    return tree;
  };
}
