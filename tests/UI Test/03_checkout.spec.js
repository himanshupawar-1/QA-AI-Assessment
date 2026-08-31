const { test, expect } = require("@playwright/test");
const { POManager } = require("../../UI/pageobjects/POManager");
const toolshop = require("../../UI/resources/data/toolshopData.json");
const { buildRegisterPayload } = require("../../API/utilities/testDataFactory");

test.describe("Toolshop UI — cart and checkout", () => {
  test("TC-UI-06 Add product to cart and increase quantity @smoke", async ({ page }) => {
    const poManager = new POManager(page);
    const home = poManager.getHomePage();
    await home.goto();
    await home.openFirstProduct();
    await poManager.getProductPage().addProductToCart(2);
    await poManager.getCheckoutPage().openCart();
    await expect(page.locator('[data-test="product-title"], [data-test="product-name"], td').first()).toBeVisible();
    const qty = page.locator('[data-test="product-quantity"], input[type="number"]').first();
    if (await qty.count()) {
      await expect(qty).toHaveValue(/[2-9]|1[0-9]/);
    }
  });

  test("TC-UI-07 Register, checkout COD, confirm twice, view invoice @regression", async ({ page }) => {
    const user = buildRegisterPayload();
    const poManager = new POManager(page);
    await poManager.getRegisterPage().goto();
    await poManager.getRegisterPage().registerCustomer(user);
    await poManager.getLoginPage().loginUser(page, user.email, user.password);

    const home = poManager.getHomePage();
    await home.goto();
    await home.openFirstProduct();
    await poManager.getProductPage().addProductToCart(1);
    await expect(page.locator('[data-test="cart-quantity"]')).toHaveText(/[1-9]/);
    await page.goto("/");
    await home.productCards.nth(1).click();
    await poManager.getProductPage().addProductToCart(2);
    await expect(page.locator('[data-test="cart-quantity"]')).toHaveText(/[2-9]/);

    const checkout = poManager.getCheckoutPage();
    await checkout.openCart();
    await checkout.proceedToCheckoutSignedIn();
    await checkout.payCashOnDeliveryAndConfirmTwice();
    await expect(page.getByText(/Thanks for your order|Payment was successful/i).first()).toBeVisible();
    await poManager.getAccountPage().openInvoices();
    if (!(await page.getByText(/INV-/).first().isVisible().catch(() => false))) {
      await page.reload();
    }
    await expect(page.getByText(/INV-/).first()).toBeVisible({ timeout: 20000 });
  });
});
