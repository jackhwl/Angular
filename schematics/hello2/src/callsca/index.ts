import {
  Rule,
  SchematicContext,
  Tree,
  chain,
  SchematicsException
  //externalSchematic
} from "@angular-devkit/schematics";
import { join, normalize } from "path";
import { getWorkspace } from "@schematics/angular/utility/workspace";

const licenseText = `
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
`;

// You don't have to export the function as default. You can also have more than one rule factory
// per file.

export async function setupOptions(host: Tree, options: any): Promise<Tree> {
  const workspace = await getWorkspace(host);
  if (!options.project) {
    options.project = workspace.projects.keys().next().value;
  }
  const project = workspace.projects.get(options.project);
  if (!project) {
    throw new SchematicsException(`Invalid project name: ${options.project}`);
  }

  options.path = join(normalize(project.root), "src", "app");
  return host;
}

export function callsca(_options: any): Rule {
  return async (tree: Tree, _context: SchematicContext) => {
    await setupOptions(tree, _options);
    return chain([
      //externalSchematic("@schematics/angular", "component", _options),
      (tree: Tree, _context: SchematicContext) => {
        tree.getDir(_options.path).visit(filePath => {
          if (!filePath.endsWith(".ts")) {
            return;
          }
          const content = tree.read(filePath);
          if (!content) {
            return;
          }

          // Prevent from writing license to files that already have one.
          if (content.indexOf(licenseText) == -1) {
            tree.overwrite(filePath, licenseText + content);
          }
        });

        return tree;
      }
    ]);
  };
}
