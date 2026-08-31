const { test, expect } = require("@playwright/test");
const { POManager } = require("../../UI/pageobjects/POManager");
const toolshop = require("../../UI/resources/data/toolshopData.json");

test.describe("Toolshop UI — catalog @smoke", () => {
  test("TC-UI-01 Catalog products are listed on home @smoke", async ({ page }) => {
    const poManager = new POManager(page);
    const home = poManager.getHomePage();
    await home.goto();
    await expect(home.productCards.first()).toBeVisible();
    expect(await home.productCards.count()).toBeGreaterThan(0);
  });

  test("TC-UI-02 Search returns matching products @smoke", async ({ page }) => {
    const poManager = new POManager(page);
    const home = poManager.getHomePage();
    await home.goto();
    await home.search(toolshop.searchTerm);
    await expect(page.locator('[data-test="search-term"], [data-test="search-caption"], h3, p').first()).toBeVisible();
    await expect(home.productCards.first()).toBeVisible();
    const names = await home.productCards.allTextContents();
    expect(names.join(" ").toLowerCase()).toContain("hammer");
  });
});
