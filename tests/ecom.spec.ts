// sid.mlv@gmail.com
//  @Pass1234

import { test, expect } from "@playwright/test";

test("Testing add to cart", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/client/");
  await page.locator("#userEmail").fill("sid.mlv@gmail.com");
  await page.locator("#userPassword").fill("@Pass1234");
  await page.locator("#login").click();
});

test("@Webst Client App login", async ({ page }) => {
  //js file- Login js, DashboardPage
  const email = "sid.mlv@gmail.com";
  const productName = "ZARA COAT 3";
  const products = page.locator(".card-body");
  await page.goto("https://rahulshettyacademy.com/client");
  await page.getByPlaceholder("email@example.com").fill(email);
  await page.getByPlaceholder("enter your passsword").fill("@Pass1234");
  await page.getByRole("button", { name: "Login" }).click();

  await page.waitForLoadState("networkidle");
  await page.locator(".card-body b").first().waitFor();

  await page
    .locator(".card-body")
    .filter({
      hasText: productName,
    })
    .getByRole("button")
    .filter({ hasText: "Add To Cart" })
    .click();

  await page
    .getByRole("listitem")
    .filter({
      hasText: "Cart",
    })
    .click();
  //await page.pause();

  await page.locator("div li").first().waitFor();

  const bool = await page
    .getByRole("listitem")
    .filter({
      hasText: productName,
    })
    .isVisible();

  expect(bool).toBeTruthy();
  // await page.locator("text=Checkout").click();
  await page
    .getByRole("button")
    .filter({
      hasText: "Checkout",
    })
    .click();

  await page
    .getByPlaceholder("Select Country")
    .pressSequentially("ind", { delay: 150 });

  const dropdown = page.locator(".ta-results");
  await dropdown.waitFor();
  const optionsCount = await dropdown.locator("button").count();
  // for (let i = 0; i < optionsCount; ++i) {
  //   const text = await dropdown.locator("button").nth(i).textContent();
  //   if (text === " India") {
  //     await dropdown.locator("button").nth(i).click();
  //     break;
  //   }
  // }

  await page
    .getByRole("button", {
      name: "Ind",
    })
    .nth(1)
    .click();

  // expect(page.locator(".us  er__name [type='text']").first()).toHaveText(email);
  await page.locator(".action__submit").click();

  // await expect(page.locator(".hero-primary")).toHaveText(
  //   " Thankyou for the order. ",
  // );

  await page.waitForLoadState("networkidle");
  const orderConfirmationHeader = await page
    .getByText("Thankyou for the order.")
    .isVisible();

  await page.pause();
  expect(orderConfirmationHeader).toBeTruthy();

  const orderId = await page
    .locator(".em-spacer-1 .ng-star-inserted")
    .textContent();
  console.log(orderId);

  // await page.locator("button[routerlink*='myorders']").click();
  await page
    .getByRole("listitem")
    .filter({
      hasText: "ORDERS",
    })
    .click();

  const myOrdersPageisVisible = await page.getByText("Your Orders").isVisible();
  expect(myOrdersPageisVisible).toBeTruthy();

  await page.locator("tbody").waitFor();
  const rows = await page.locator("tbody tr");

  // for (let i = 0; i < (await rows.count()); ++i) {
  //   const rowOrderId = await rows.nth(i).locator("th").textContent();
  //   if (orderId.includes(rowOrderId)) {
  //     await rows.nth(i).locator("button").first().click();
  //     break;
  //   }
  // }

  expect(orderId).toBeTruthy();

  await page
    .locator("tr")
    .filter({
      hasText: orderId,
    })
    .getByRole("button")
    .filter({
      hasText: "View",
    })
    .click();

  const orderIdDetails = await page.locator(".col-text").textContent();
  expect(orderId.includes(orderIdDetails)).toBeTruthy();
});

test("e2e placing order", async ({ page }) => {
  const email = "sid.mlv@gmail.com";
  const productName = "ZARA COAT 3";
  const products = page.locator(".card-body");
  await page.goto("https://rahulshettyacademy.com/client");
  await page.locator("#userEmail").fill(email);
  await page.locator("#userPassword").fill("@Pass1234");
});
