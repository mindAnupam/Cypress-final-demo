class LoginPage {
  // Selectors
  emailInput = 'input[id="Email"]';
  passwordInput = 'input[id="Password"]';
  loginButton = ".login-button";
  incorrectPassMsg = "The credentials provided are incorrect";
  incorrectUserMsg = "No customer account found";
  emptyEmailMsg = "Please enter your email";
  errorMessage = ".validation-summary-errors";
  emailError = "#Email-error";

  // Methods
  visitLoginPage() {
    cy.visit(Cypress.env("login_url"));
  }

  login(email, pass) {
    // Enter valid username but wrong password
    cy.get(this.emailInput).clear().type(email);
    cy.get(this.passwordInput).clear().type(pass);

    // Click on login button
    cy.get(this.loginButton).click();
  }
}

export default new LoginPage();
