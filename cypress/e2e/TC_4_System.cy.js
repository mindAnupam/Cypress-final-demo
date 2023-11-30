/// <reference types="Cypress" />

import LoginPage from "../pages/loginPage";
import Dashboard from "../pages/dashboardPage";
import systemPage from "../pages/systemPage";

describe("Verify System functionality", () => {
  beforeEach(() => {
    cy.login(Cypress.env("email"), Cypress.env("password"));
    LoginPage.visitLoginPage();
    Dashboard.selectMenu("System");
  });

  it("Verify system info tab", () => {
    Dashboard.selectSubMenu("System information");

    // Verify header
    cy.get(systemPage.header).should("contain", "System information");

    // Verify total count
    cy.get(systemPage.formGroups).should("have.length", 9);

    cy.fixture("system").then((systemInfo) => {
      cy.wrap(systemInfo.systemInfo).each(({ label, value }, index) => {
        cy.log(label + "::" + value);
        cy.get(systemPage.label).eq(index).should("contain", label);
        cy.get(systemPage.formTextRow).eq(index).should("contain", value);
      });
    });
  });

  it("Assert warnings tab", () => {
    Dashboard.selectSubMenu("Warnings");

    cy.fixture("system").then((data) => {
      cy.get(".card-body p.text-green").should(
        "have.length",
        data.expectedTexts.length
      );

      // Assert text content
      cy.get(".card-body p.text-green").each(($paragraph, index) => {
        cy.wrap($paragraph).should("contain.text", data.expectedTexts[index]);
      });
    });
  });

  it.only("Assert  Message queue tab", () => {
    Dashboard.selectSubMenu("Message queue");
    systemPage.fillSearchForm(
      "2023-01-01",
      "2023-12-31",
      "from@example.com",
      "to@example.com",
      true,
      "5",
      "10"
    );

    cy.get(systemPage.searchButton).click();
  });
});
