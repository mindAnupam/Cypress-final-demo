class CustomerPage {
  email = "input#SearchEmail";
  firstName = "input#SearchFirstName";
  lastName = "input#SearchLastName";
  searchBtn = "button#search-customers";
  tableHead = "#vendors-grid thead th";
  tableBody = "#vendors-grid tbody tr";
  activeIcon = ".fas.fa-check.true-icon";
  editBtn = ".button-column a.btn";
  addBtn = ".fa-plus-square";
  vendorName = "#Name";
  vendorEMail = "#Email";
  vendorSave = "[name='save']";
  vendorIframe = "#Description_ifr";
  roleUpdateMessage = "The customer role has been updated successfully.";
  originalText = "Another text";
  replacedText = "Anupam";

  get firstRowName() {
    return cy.get("#customerroles-grid tbody tr:first-child td:nth-child(1)");
  }

  get editButton() {
    return cy.get("#customerroles-grid tbody tr:first-child .button-column a");
  }

  get nameRole() {
    return cy.get("#Name");
  }

  get saveRole() {
    return cy.get('[name="save"]');
  }
}

export default new CustomerPage();
