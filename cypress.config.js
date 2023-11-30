const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "nxyf6v",
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  reporter: "mochawesome",
  reporterOptions: {
    reportDir: "cypress/reports/mochawesome",
    overwrite: true,
    html: true,
    json: true,
  },
  retries: 1,
  watchForFileChanges: true,
  pageLoadTimeout: 10000,
  defaultCommandTimeout: 40000,
});
