class ProductPage {
  //Selectors
  ProductNameLabel = '[for="SearchProductName"]';
  ProductNameInput = "input[id='SearchProductName']";
  CategoryLabel = '[for="SearchCategoryId"]';
  ProductSearchBtn = "#search-products";
  TagSearchBtn = "#search-product-tags";
  SearchProductName = "#SearchProductName";
  SearchCategoryId = "#SearchCategoryId";
  ProductSearchBtn = "#ProductSearchBtn";

  //Methods
  assertLabelAndInput(label, text) {
    // Assert the label
    cy.get(`label[for="${label}"]`).should("contain", text);

    // Assert the input element
    cy.get(`#${label}`).should("be.visible");
  }

  assertNumberOfRows(tableLocator, expectedRowCount) {
    cy.get(`table${tableLocator}`)
      .find("tbody")
      .children("tr")
      .should("have.length", expectedRowCount);
  }

  assertProductText(tableLocator, column, text) {
    cy.get(`table${tableLocator}`)
      .find("tbody")
      .children("tr")
      .eq(0)
      .find("td")
      .eq(column)
      .should("have.text", text);
  }

  selectSubMenu(text) {
    cy.get("li.nav-item").contains("a.nav-link", text).click();
  }
}

export default new ProductPage();
