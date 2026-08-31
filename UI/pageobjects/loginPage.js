import { expect } from "@playwright/test";
import loggerUtilities from "../../commonUtils/loggerUtil";

class loginPage {
  constructor(page) {
    this.page = page;
    this.log = new loggerUtilities();
    this.navSignIn = page.locator('[data-test="nav-sign-in"]');
    this.email = page.locator('[data-test="email"]');
    this.password = page.locator('[data-test="password"]');
    this.loginbtn = page.locator('[data-test="login-submit"]');
    this.loginError = page.locator('[data-test="login-error"]');
    this.registerLink = page.locator('[data-test="register-link"]');
    this.navMenu = page.locator('[data-test="nav-menu"]');
  }

  async goto() {
    await this.page.goto("/auth/login");
    await this.email.waitFor({ state: "visible" });
    this.log.logger("Opened Toolshop login page");
  }

  async loginUser(page, username, password) {
    await this.email.fill("");
    await this.email.fill(username);
    await this.password.fill("");
    await this.password.fill(password);
    await this.loginbtn.click();
    await expect(this.navMenu).toBeVisible({ timeout: 25000 });
    this.log.logger("Login successful");
  }

  async loginUser_Incorrectdetails(page, username, password) {
    await this.email.fill(username);
    await this.password.fill(password);
    await this.loginbtn.click();
    await expect(this.loginError).toBeVisible();
    this.log.logger("Invalid login error displayed");
  }
}

export default { loginPage };
