const { test, expect } = require("@playwright/test");
const { POManager } = require("../../UI/pageobjects/POManager");
const toolshop = require("../../UI/resources/data/toolshopData.json");
const { buildRegisterPayload } = require("../../API/utilities/testDataFactory");

test.describe("Toolshop UI — authentication", () => {
  test("TC-UI-03 Invalid login shows error @regression", async ({ page }) => {
    const poManager = new POManager(page);
    const loginPage = poManager.getLoginPage();
    await loginPage.goto();
    await loginPage.loginUser_Incorrectdetails(
      page,
      toolshop.invalidLogin.email,
      toolshop.invalidLogin.password
    );
    await expect(loginPage.loginError).toBeVisible();
  });

  test("TC-UI-04 Valid login opens account menu @smoke", async ({ page, request }) => {
    const user = buildRegisterPayload();
    const register = await request.post(`${process.env.API_URL}/users/register`, {
      data: user,
      headers: { accept: "application/json", "content-type": "application/json" },
    });
    expect(register.status()).toBe(201);

    const poManager = new POManager(page);
    const loginPage = poManager.getLoginPage();
    await loginPage.goto();
    await loginPage.loginUser(page, user.email, user.password);
    await expect(loginPage.navMenu).toBeVisible();
  });

  test("TC-UI-05 New customer can register then login @regression", async ({ page }) => {
    const user = buildRegisterPayload();
    const poManager = new POManager(page);
    await poManager.getRegisterPage().goto();
    await poManager.getRegisterPage().registerCustomer(user);
    await poManager.getLoginPage().loginUser(page, user.email, user.password);
    await poManager.getAccountPage().openProfile();
    await expect(page.locator('[data-test="email"]')).toHaveValue(user.email);
  });
});
