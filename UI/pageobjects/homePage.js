import loggerUtilities from "../../commonUtils/loggerUtil";

class homePage {
  constructor(page) {
    this.page = page;
    this.log = new loggerUtilities();
    this.productCards = page.locator('[data-test="product-name"]');
    this.searchInput = page.locator('[data-test="search-query"]');
    this.searchSubmit = page.locator('[data-test="search-submit"]');
    this.navHome = page.locator('[data-test="nav-home"]');
    this.navSignIn = page.locator('[data-test="nav-sign-in"]');
    this.navCart = page.locator('[data-test="nav-cart"]');
  }

  async goto() {
    await this.page.goto("/");
    await this.productCards.first().waitFor({ state: "visible" });
    this.log.logger("Toolshop home catalog loaded");
  }

  async search(term) {
    await this.searchInput.fill(term);
    await this.searchSubmit.click();
    this.log.logger(`Searched for ${term}`);
  }

  async openFirstProduct() {
    await this.productCards.first().click();
    this.log.logger("Opened first catalog product");
  }

  async openProductByName(name) {
    await this.page.getByTestId("product-name").filter({ hasText: name }).first().click();
    this.log.logger(`Opened product ${name}`);
  }
}

module.exports = { homePage };
