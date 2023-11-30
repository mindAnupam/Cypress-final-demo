/// <reference types="Cypress" />

import LoginPage from "../pages/loginPage";
import DashboardPage from "../pages/dashboardPage";
import ConfigPage from "../pages/configPage";

describe("Verify Configuration tab functionality", () => {
  beforeEach(() => {
    cy.login(Cypress.env("email"), Cypress.env("password"));
    LoginPage.visitLoginPage();
    DashboardPage.selectMenu("Configuration");
  });

  it("Verify setting tab", () => {
    DashboardPage.selectSubMenu("Settings");
    DashboardPage.selectSubMenu("General settings");

    cy.get(ConfigPage.onOffSwitchInner)
      .invoke("css", "margin-left")
      .then((marginLeft) => {
        const absoluteMarginLeft = Math.abs(parseInt(marginLeft, 10));
        if (absoluteMarginLeft > 10) {
          cy.get(DashboardPage.onOffSwitch).click();
        }
      });

    // Assert that default logo is shown
    cy.get(ConfigPage.uploadedImage)
      .eq(0)
      .should(
        "have.attr",
        "src",
        "https://admin-demo.nopcommerce.com/images/thumbs/default-image_100.png"
      );

    // Upload Logo
    cy.get(ConfigPage.fileInput)
      .eq(0)
      .selectFile("cypress/fixtures/sample-image.jpg", { force: true });

    // Assert that default logo is not shown
    cy.get(ConfigPage.uploadedImage)
      .eq(0)
      .should("have.attr", "src")
      .and("include", "sample-image");

    // Verify that remove button is now visible
    cy.get(ConfigPage.removeButton).eq(0).should("be.visible");

    cy.get(ConfigPage.euCookieLawCheckbox).eq(0).check();
    cy.get(ConfigPage.systemEmailCheckbox).uncheck();

    cy.get(ConfigPage.searchPlusIcon).scrollIntoView();

    cy.get(ConfigPage.wwwRequirementDropdown).select(
      "Pages should have WWW prefix"
    );
  });
});
