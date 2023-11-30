/// <reference types="Cypress" />

import LoginPage from "../pages/loginPage";
import Dashboard from "../pages/dashboardPage";
import customerPage from "../pages/customerPage";

describe("Customer tab", () => {
  beforeEach(() => {
    cy.login(Cypress.env("email"), Cypress.env("password"));
    LoginPage.visitLoginPage();
    Dashboard.selectMenu("Customers");
  });

  it("Verify customers roles tab usage", () => {
    Dashboard.selectSubMenu("Customer roles");

    // Initial verification
    customerPage.firstRowName.should("not.contain", customerPage.replacedText);

    // Edit and verify
    customerPage.editButton.click();
    customerPage.nameRole.clear().type(customerPage.replacedText);
    customerPage.saveRole.click();

    cy.get(Dashboard.successAlert).should("be.visible");

    cy.get(Dashboard.successAlert).contains(customerPage.roleUpdateMessage);

    customerPage.firstRowName.should("contain", customerPage.replacedText);

    // Revert all data
    customerPage.editButton.click();
    customerPage.nameRole.clear().type(customerPage.originalText);
    customerPage.saveRole.click();

    cy.get(Dashboard.successAlert).should("be.visible");
    customerPage.firstRowName.should("not.contain", customerPage.replacedText);
  });

  it.only("Verify vendor tab", () => {
    Dashboard.selectSubMenu("Vendors");

    cy.get(customerPage.tableHead).should("have.length", 4);
    cy.get(customerPage.tableHead).eq(0).should("have.text", "Name");
    cy.get(customerPage.tableHead).eq(1).should("have.text", "Email");
    cy.get(customerPage.tableHead).eq(2).should("have.text", "Active");
    cy.get(customerPage.tableHead).eq(3).should("have.text", "Edit");

    // Assertions for the table rows
    cy.get(customerPage.tableBody).should("have.length", 2);

    // Assertion for the first row data
    cy.get(customerPage.tableBody).eq(0).should("contain", "Vendor 1");
    cy.get(customerPage.tableBody)
      .eq(0)
      .should("contain", "vendor1email@gmail.com");
    cy.get(customerPage.tableBody)
      .eq(0)
      .find(customerPage.activeIcon)
      .should("exist");
    cy.get(customerPage.tableBody)
      .eq(0)
      .find(customerPage.editBtn)
      .should("exist");

    // Assertion for the second row data
    cy.get(customerPage.tableBody).eq(1).should("contain", "Vendor 2");
    cy.get(customerPage.tableBody)
      .eq(1)
      .should("contain", "vendor2email@gmail.com");
    cy.get(customerPage.tableBody)
      .eq(1)
      .find(customerPage.activeIcon)
      .should("exist");
    cy.get(customerPage.tableBody)
      .eq(1)
      .find(customerPage.editBtn)
      .should("exist");

    cy.get(customerPage.addBtn).click();
    cy.get(customerPage.vendorName).clear().type("Anupam");
    cy.iframe(customerPage.vendorIframe)
      .find("p")
      .should("be.visible")
      .type("Totally random description");
    cy.get(customerPage.vendorEMail).clear().type("anupam@anupam.com");
    cy.get(customerPage.vendorSave).click();
    cy.get(Dashboard.errorAlert).should("be.visible");
  });
});
