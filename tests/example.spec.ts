import { test, expect } from "@playwright/test";

test("has title", async ({ page }) => {
  await page.goto("https://playwright.dev/");

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test("get started link", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto("https://playwright.dev/");


  // Click the get started link.
  await page.getByRole("link", { name: "Get started" }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(
    page.getByRole("heading", { name: "Installation" })
  ).toBeVisible();
});

test("test creating an account", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
  await page.locator(".text-reset").click();
  await page.waitForLoadState("networkidle");
  await page.locator(".login-wrapper.my-auto.p-5 .login-title").waitFor();

  await page.locator("#firstName").fill("John");
  await page.locator("#lastName").fill("Doe");
  await page.locator("#userEmail").fill(`doe.jon${Date.now()}@gmail.com`);
  await page
    .locator("#userMobile")
    .fill(`${Math.floor(1000000000 + Math.random() * 9000000000)}`);
  await page.locator(".custom-select").selectOption("3: Engineer");
  await page.locator("input[value='Male']").click();

  await page.locator("#userPassword").fill("Pass@1234");
  await page.locator("#confirmPassword").fill("Pass@1234");

  await expect(await page.locator("input[type='checkbox']").isChecked()).toBeFalsy();
  await page.locator("input[type='checkbox']").check();
  await expect(page.locator("input[type='checkbox']")).toBeChecked();

  await page.locator("#login").click();
  const accountCreatedSucccessText = await page.locator(
    ".login-wrapper .headcolor"
  );
  await expect(accountCreatedSucccessText).toContainText(
    "Created Successfully"
  );
});


