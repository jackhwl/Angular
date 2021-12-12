import { Tree, formatFiles, updateJson } from '@nrwl/devkit';

export default async function(host: Tree, schema: any) {
  await updateJson(host, 'nx.json', nxJson => {
    nxJson.defaultProject = 'api';
    return nxJson;
  });
  await formatFiles(host);
}
