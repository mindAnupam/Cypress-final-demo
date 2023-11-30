import LoginPage from "../pages/loginPage";
import "cypress-iframe";

Cypress.Commands.add("login", (email, pass) => {
  cy.session([email, pass], () => {
    //Login to app
    LoginPage.visitLoginPage();

    // Enter valid email and password
    LoginPage.login(email, pass);

    // Assert that the dashboard is loaded
    cy.url().should("eq", Cypress.env("dashboard_url"));
  });
});

Cypress.Commands.add("logout", () => {
  // Perform logout
  cy.get("a[href='/logout']").should("be.visible").click();
});

Cypress.Commands.add("selectMenu", (menuText) => {
  cy.get("li.nav-item a.nav-link p").contains(menuText).click();
});
