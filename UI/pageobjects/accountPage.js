import { expect } from "@playwright/test";
import loggerUtilities from "../../commonUtils/loggerUtil";

class accountPage {
  constructor(page) {
    this.page = page;
    this.log = new loggerUtilities();
    this.navMenu = page.locator('[data-test="nav-menu"]');
    this.myInvoices = page.locator('[data-test="nav-my-invoices"]');
    this.profile = page.locator('[data-test="nav-profile"]');
    this.invoiceRows = page.locator("table tbody tr");
  }

  async openProfile() {
    await this.navMenu.click();
    await this.profile.click();
    await expect(this.page.locator('[data-test="email"]')).toBeVisible();
    this.log.logger("Opened profile");
  }

  async openInvoices() {
    await this.navMenu.click();
    await this.myInvoices.click();
    await expect(this.page).toHaveURL(/invoices/i);
    await this.page.locator("h1, h2").filter({ hasText: /invoice/i }).first().waitFor({ state: "visible" });
    this.log.logger("Opened My Invoices");
  }
}

module.exports = { accountPage };
