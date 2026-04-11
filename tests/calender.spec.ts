import { test, expect } from "@playwright/test";

test("Calender Validation", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/");

  const productsToPurchase = ["Capsicum", "Mushroom", "Potato"];

  for (const prod of productsToPurchase) {
    await page
      .locator(".product")
      .filter({
        hasText: prod,
      })
      .getByRole("button")
      .click();
  }

  //   await page.pause();

  await page.getByRole("link", { name: "Cart" }).click();

  await page
    .getByRole("button")
    .filter({
      hasText: "PROCEED",
    })
    .click();

  await page.getByRole("table").waitFor();

  await page
    .getByRole("button")
    .filter({
      hasText: "Place Order",
    })
    .waitFor();

  await page.waitForLoadState("networkidle");

  for (const prod of productsToPurchase) {
    const prodIsVisible = await page
      .getByRole("table")
      .getByRole("row")
      .filter({
        hasText: prod,
      })
      .isVisible();

    expect(prodIsVisible).toBeTruthy();
  }

  await page
    .getByRole("button")
    .filter({
      hasText: "Place Order",
    })
    .click();

  await page.selectOption("select", { value: "India" });

  await page.getByRole("checkbox").check();

  await page
    .getByRole("button")
    .filter({
      hasText: "Proceed",
    })
    .click();
});
