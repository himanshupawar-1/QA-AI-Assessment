import { expect } from "@playwright/test";
import loggerUtilities from "../../commonUtils/loggerUtil";

class checkoutPage {
  constructor(page) {
    this.page = page;
    this.log = new loggerUtilities();
    this.navCart = page.locator('[data-test="nav-cart"]');
    this.proceed1 = page.locator('[data-test="proceed-1"]');
    this.proceed2 = page.locator('[data-test="proceed-2"]');
    this.proceed3 = page.locator('[data-test="proceed-3"]');
    this.paymentMethod = page.locator('[data-test="payment-method"]');
    this.finish = page.locator('[data-test="finish"]');
    this.confirm = page.getByRole("button", { name: /confirm/i });
    this.billingHouseNumber = page.locator('[data-test="house_number"]');
    this.billingStreet = page.locator('[data-test="street"]');
    this.billingCity = page.locator('[data-test="city"]');
    this.billingState = page.locator('[data-test="state"]');
    this.billingPostal = page.locator('[data-test="postal_code"]');
    this.billingCountry = page.locator('[data-test="country"]');
  }

  async _clickIfReady(locator, label) {
    try {
      await locator.waitFor({ state: "visible", timeout: 8000 });
      await locator.click({ timeout: 8000 });
      this.log.logger(`Clicked ${label}`);
      return true;
    } catch (error) {
      this.log.logger(`${label} not clickable: ${error.message}`);
      return false;
    }
  }

  async openCart() {
    await this.navCart.click();
    await expect(this.page).toHaveURL(/\/checkout/);
    this.log.logger("Opened cart/checkout");
  }

  async proceedToCheckoutSignedIn() {
    await this._clickIfReady(this.proceed1, "proceed-1");
    await this._clickIfReady(this.proceed2, "proceed-2");
    await this.billingHouseNumber.waitFor({ state: "visible", timeout: 10000 });
    await this.billingHouseNumber.fill("101");
    await this.billingHouseNumber.blur();
    if (!(await this.billingStreet.inputValue())) {
      await this.billingStreet.fill("101 Testing Way");
    }
    if (!(await this.billingCity.inputValue())) {
      await this.billingCity.fill("New York");
    }
    if (!(await this.billingState.inputValue())) {
      await this.billingState.fill("NY");
    }
    await expect(this.proceed3).toBeEnabled({ timeout: 15000 });
    await this.proceed3.click();
    this.log.logger("Clicked proceed-3");
    await this.paymentMethod.waitFor({ state: "visible", timeout: 15000 });
    this.log.logger("Reached payment step");
  }

  async payCashOnDeliveryAndConfirmTwice() {
    await this.paymentMethod.selectOption("cash-on-delivery");
    const confirmBtn = (await this.finish.count()) ? this.finish : this.confirm.first();
    await confirmBtn.click();
    this.log.logger("Confirm click 1");
    await expect(this.page.getByText("Payment was successful")).toBeVisible();
    await confirmBtn.click();
    this.log.logger("Confirm click 2 — invoice generation");
    const thanks = this.page.getByText(/Thanks for your order/i);
    try {
      await thanks.waitFor({ state: "visible", timeout: 8000 });
    } catch (error) {
      this.log.logger("Thanks not visible after second Confirm; clicking once more");
      await confirmBtn.click();
      await thanks.waitFor({ state: "visible", timeout: 15000 });
    }
  }
}

module.exports = { checkoutPage };
