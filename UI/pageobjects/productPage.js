import { expect } from "@playwright/test";
import loggerUtilities from "../../commonUtils/loggerUtil";

class productPage {
  constructor(page) {
    this.page = page;
    this.log = new loggerUtilities();
    this.productName = page.locator('[data-test="product-name"]');
    this.quantity = page.locator('[data-test="quantity"]');
    this.increaseQty = page.locator('[data-test="increase-quantity"]');
    this.addToCart = page.locator('[data-test="add-to-cart"]');
    this.toast = page.locator(".toast-message, .alert-success, [role='alert']");
  }

  async setQuantity(value) {
    const current = Number((await this.quantity.inputValue().catch(() => "1")) || "1");
    for (let i = current; i < value; i += 1) {
      if (await this.increaseQty.count()) {
        await this.increaseQty.click();
      } else {
        await this.quantity.fill(String(value));
        break;
      }
    }
    this.log.logger(`Quantity set towards ${value}`);
  }

  async addProductToCart(quantity = 1) {
    await this.setQuantity(quantity);
    await this.addToCart.click();
    this.log.logger("Clicked Add to cart");
  }
}

module.exports = { productPage };
