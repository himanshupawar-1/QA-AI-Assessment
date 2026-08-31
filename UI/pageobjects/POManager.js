const { loginPage } = require("./loginPage").default;
const { homePage } = require("./homePage");
const { registerPage } = require("./registerPage");
const { productPage } = require("./productPage");
const { checkoutPage } = require("./checkoutPage");
const { accountPage } = require("./accountPage");
const { webUtils } = require("../utilities/webUtils");

class POManager {
  constructor(page) {
    this.page = page;
    this.loginPage = new loginPage(this.page);
    this.homePage = new homePage(this.page);
    this.registerPage = new registerPage(this.page);
    this.productPage = new productPage(this.page);
    this.checkoutPage = new checkoutPage(this.page);
    this.accountPage = new accountPage(this.page);
    this.webUtils = new webUtils(page);
  }

  getLoginPage() {
    return this.loginPage;
  }

  getHomePage() {
    return this.homePage;
  }

  getRegisterPage() {
    return this.registerPage;
  }

  getProductPage() {
    return this.productPage;
  }

  getCheckoutPage() {
    return this.checkoutPage;
  }

  getAccountPage() {
    return this.accountPage;
  }

  getWebUtils() {
    return this.webUtils;
  }
}

module.exports = { POManager };
