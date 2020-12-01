import { apply, mergeWith, move, Rule, SchematicContext, template, Tree, url } from '@angular-devkit/schematics';
import { strings } from '@angular-devkit/core';
import { getWorkspace } from "@schematics/angular/utility/config";
import { parseName } from "@schematics/angular/utility/parse-name";
import { WorkspaceProject } from '@schematics/angular/utility/workspace-models';


export function crudResource(_options: any): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    const workspace = getWorkspace(tree);
    const projectName = _options.project || Object.keys(workspace.projects)[0];
    const project = workspace.projects[projectName]; //getProject(workspace, projectName);
    const path = _options.path || buildDefaultPath(project); 
    const parsedPath = parseName(path, _options.name);

    _options.name = parsedPath.name;
    _options.path = parsedPath.path;

    const sourceTemplate = url('./files');
    const sourceParameterizedTemplates = apply(sourceTemplate, [
      template({
        ..._options, 
        ...strings
      }),
      move(parsedPath.path)
    ])

    tree = mergeWith(sourceParameterizedTemplates)(tree, _context) as Tree;

    return tree;
  };
}

function buildDefaultPath(project: WorkspaceProject) {
  const root = project.sourceRoot
      ? `/${project.sourceRoot}/`
      : `/${project.root}/src/`;
  const projectDirName = project.projectType === 'application' ? 'app' : 'lib';
  return `${root}${projectDirName}`;
}