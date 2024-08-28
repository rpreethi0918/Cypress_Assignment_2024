import { defineConfig } from 'cypress';

export default defineConfig(
  {
  e2e: {
    defaultCommandTimeout: 10000,
    pageLoadTimeout: 60000,
    screenshotsFolder: 'cypress/screenshots',
    video: false, 
    reporter: 'cypress-mochawesome-reporter',
    screenshotOnRunFailure: true,
    testIsolation: false,
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
    },
  },
});
