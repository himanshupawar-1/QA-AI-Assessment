import { expect } from "@playwright/test";
import loggerUtilities from "../../commonUtils/loggerUtil";

class registerPage {
  constructor(page) {
    this.page = page;
    this.log = new loggerUtilities();
    this.firstName = page.locator('[data-test="first-name"]');
    this.lastName = page.locator('[data-test="last-name"]');
    this.dob = page.locator('[data-test="dob"]');
    this.country = page.locator('[data-test="country"]');
    this.postalCode = page.locator('[data-test="postal_code"]');
    this.houseNumber = page.locator('[data-test="house_number"]');
    this.street = page.locator('[data-test="street"]');
    this.city = page.locator('[data-test="city"]');
    this.state = page.locator('[data-test="state"]');
    this.phone = page.locator('[data-test="phone"]');
    this.email = page.locator('[data-test="email"]');
    this.password = page.locator('[data-test="password"]');
    this.submit = page.locator('[data-test="register-submit"]');
  }

  async goto() {
    await this.page.goto("/auth/register");
    await this.firstName.waitFor({ state: "visible" });
    this.log.logger("Opened register page");
  }

  async registerCustomer(user) {
    await this.firstName.fill(user.first_name);
    await this.lastName.fill(user.last_name);
    await this.dob.click();
    await this.dob.fill("");
    await this.dob.fill(user.dob);
    await this.country.selectOption({ value: user.address.country });
    await this.postalCode.fill(user.address.postal_code);
    await this.houseNumber.fill(user.address.house_number || "101");
    await this.street.fill(user.address.street);
    await this.city.fill(user.address.city);
    await this.state.fill(user.address.state);
    await this.phone.fill(user.phone);
    await this.email.fill(user.email);
    await this.password.fill(user.password);
    await this.submit.click();
    await expect(this.page).toHaveURL(/\/auth\/login/, { timeout: 20000 });
    this.log.logger(`Registered ${user.email}`);
  }
}

module.exports = { registerPage };
