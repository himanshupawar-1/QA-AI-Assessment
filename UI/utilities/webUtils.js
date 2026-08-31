class webUtils {
  constructor(page) {
    this.page = page;
  }

  async waitForNetworkToIdleState() {
    await this.page.waitForLoadState("domcontentloaded");
  }

  async waitForElement(selector, timeout = 10000) {
    await this.page.locator(selector).first().waitFor({ state: "visible", timeout });
  }
}

module.exports = { webUtils };
