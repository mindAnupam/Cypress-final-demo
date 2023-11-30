/// <reference types="Cypress" />

import LoginPage from "../pages/loginPage";

// Retrieve values from Cypress environment variables
const url = Cypress.env("dashboard_url");
const email = Cypress.env("email");
const password = Cypress.env("password");

// Test suite for the Login Page
describe("Login Page Tests", { retries: 1 }, () => {
  // Setup steps to be executed before each test case
  beforeEach(() => {
    // Visit the login page and verify elements' visibility
    LoginPage.visitLoginPage();
    cy.get(".title").children().should("have.text", "Welcome, please sign in!");
    cy.get(LoginPage.emailInput).should("be.visible");
    cy.get(LoginPage.passwordInput).should("be.visible");
    cy.get(LoginPage.loginButton).should("be.visible");
  });

  // Test case for a valid login
  it("Valid Login", () => {
    // Enter valid email and password
    LoginPage.login(email, password);

    // Assert that the dashboard is loaded after successful login
    cy.url().should("eq", url);
  });

  // Test case for an invalid login with an incorrect password
  it("Invalid Login - Incorrect Password", () => {
    // Attempt login with incorrect password
    LoginPage.login(email, "anupam");

    // Verify error message and URL after an unsuccessful login attempt
    cy.get(LoginPage.errorMessage).should("be.visible");
    cy.get(LoginPage.errorMessage).should(
      "contain",
      LoginPage.incorrectPassMsg
    );
    cy.url().should("not.eq", url);
  });

  // Test case for an invalid login with a non-existent user
  it("Invalid Login - Non-existent User", () => {
    // Attempt login with a non-existent user
    LoginPage.login("anupam@yourstore.com", password);

    // Verify error message and URL after an unsuccessful login attempt
    cy.get(LoginPage.errorMessage).should("be.visible");
    cy.get(LoginPage.errorMessage).should(
      "contain",
      LoginPage.incorrectUserMsg
    );
    cy.url().should("not.eq", url);
  });

  // Test case for empty fields or wrong format
  it("Empty Fields or Wrong Format", () => {
    // Clear email and password fields, then click the login button
    cy.get(LoginPage.emailInput).clear();
    cy.get(LoginPage.passwordInput).clear();
    cy.get(LoginPage.loginButton).click();

    // Verify error message and URL after attempting login with empty fields
    cy.get(LoginPage.emailError).should("be.visible");
    cy.get(LoginPage.emailError).should("contain", LoginPage.emptyEmailMsg);
    cy.url().should("not.eq", url);

    // Type an invalid email, verify error message for wrong email format
    cy.get(LoginPage.emailInput).type("anupam");
    cy.get(LoginPage.emailError).should("be.visible");
    cy.get(LoginPage.emailError).should("contain", "Wrong email");
  });
});
