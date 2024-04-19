import { nxE2EPreset } from '@nx/cypress/plugins/cypress-preset';

import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    ...nxE2EPreset(__filename, {
      cypressDir: 'src',
      webServerCommands: {
        default: 'nx run lawfirm-matters-matters:serve:development',
        production: 'nx run lawfirm-matters-matters:serve:production',
      },
      ciWebServerCommand: 'nx run lawfirm-matters-matters:serve-static',
    }),
    baseUrl: 'http://localhost:4200',
  },
});
