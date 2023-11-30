class SystemPage {
  //Selectors
  header = ".content-header > h1";
  formGroups = ".form-group.row";
  label = ".col-form-label";
  formTextRow = ".form-text-row";
  startDate = "input#SearchStartDate";
  endDate = "input#SearchEndDate";
  fromEmail = "input#SearchFromEmail";
  toEmail = "input#SearchToEmail";
  loadNotSent = "input#SearchLoadNotSent";
  goToEmailBtn = "button#go-to-email-by-number";
  searchButton = "button#search-queuedemails";

  fillSearchForm(startDate, endDate, fromEmail, toEmail, loadNotSent) {
    cy.get(this.startDate).clear().type(startDate);
    cy.get(this.endDate).clear().type(endDate);
    cy.get(this.fromEmail).clear().type(fromEmail);
    cy.get(this.toEmail).clear().type(toEmail);
    if (loadNotSent) {
      cy.get(this.loadNotSent).check();
    }
  }
}

export default new SystemPage();
