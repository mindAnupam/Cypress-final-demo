/// <reference types="Cypress" />

import LoginPage from "../pages/loginPage";
import dashboardPage from "../pages/dashboardPage";

describe("Verify dashboard functionality", () => {
  beforeEach(() => {
    // Log in before each test
    cy.login(Cypress.env("email"), Cypress.env("password"));
    // Visit the login page to start each test from a known state
    LoginPage.visitLoginPage();
  });

  it("Verify catalog and its submenu", () => {
    // Hover over the icon to expand the sidebar
    cy.get(".navbar")
      .should("not.have.class", dashboardPage.isScrollBarVisible)
      .then(() => {
        cy.get(dashboardPage.hamburger).click();
      });

    // Assert that the "Catalog" option is shown
    cy.contains(dashboardPage.sidebar, "Catalog");

    // Select the "Catalog" option
    cy.get(dashboardPage.sidebarItem).eq(1).click();

    // Assert the total subcategories and their text
    cy.get(dashboardPage.sidebarItem)
      .eq(1)
      .children("ul")
      .each(($el) => {
        cy.wrap($el)
          .children()
          .should("have.length", 6)
          .each(($el, subIndex) => {
            cy.wrap($el).should("contain", dashboardPage.subMenu[subIndex]);
          });
      });
  });

  it("Logout", () => {
    // Assert that the logout button is visible
    cy.get(dashboardPage.logoutBtn).should("be.visible");

    // Click on the logout button
    cy.get(dashboardPage.logoutBtn).click();

    // Assert that the user is navigated back to the login page
    cy.url().should("contain", Cypress.env("login_url"));
  });
});
