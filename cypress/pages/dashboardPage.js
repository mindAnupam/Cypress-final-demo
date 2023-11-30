class DashboardPage {
  //Selectors
  successAlert = ".alert-success";
  errorAlert = ".alert-danger";
  logoutBtn = "a[href='/logout']";
  isScrollBarVisible = ".os-host-scrollbar-horizontal-hidden";
  hamburger = "#nopSideBarPusher";
  sidebarItem = ".nav-sidebar > li";
  sidebar = ".nav-item";

  subMenu = [
    " Products",
    " Categories",
    " Manufacturers",
    " Product reviews",
    " Product tags",
    "Attributes",
  ];

  getMainMenuItems() {
    return cy.get(".nav-sidebar").find(".nav-item");
  }

  getMenuText(menuItem) {
    return menuItem.find(".nav-link p").text().trim();
  }

  clickMenuItem(menuItem) {
    menuItem.find(".nav-link").click();
  }

  getSubmenuItems(menuItem) {
    return menuItem.find(".nav-treeview .nav-item");
  }

  getSubmenuText(submenuItem) {
    return submenuItem.find(".nav-link p").text().trim();
  }

  verifyTotalItemCount(expectedCount) {
    this.getMainMenuItems().should("have.length", expectedCount);
  }

  // Click on a menu item
  clickMenuItem(menuItem) {
    return cy.wrap(menuItem).click();
  }
  selectMenu(menu) {
    //Hover over the icon to expand side bar
    cy.get(".navbar")
      .should("not.have.class", ".os-host-scrollbar-horizontal-hidden")
      .then(() => {
        cy.get("#nopSideBarPusher").click();
      });

    //Select the catalog option
    cy.selectMenu(" " + menu);
  }

  selectSubMenu(subMenu) {
    cy.get("li.nav-item").contains("a.nav-link", subMenu).click();
  }
}

export default new DashboardPage();
