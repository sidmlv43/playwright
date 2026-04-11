import { test, expect } from "@playwright/test";


test("Test Login with correct username and correct password", async ({
  page,
}) => {
  await page.goto("https://rahulshettyacademy.com/loginpagePractise");
  await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");

  const usernameField = page.getByLabel("Username:");
  const passwordInputField = page.getByLabel("Password:");
  const signInBtn = page.getByRole("button");
  await usernameField.fill("rahulshettyacademy");
  await passwordInputField.fill("learning");
  await page.getByLabel("terms and conditions").check()
  await signInBtn.click();
  await page.waitForLoadState("networkidle");

  // await page.waitForURL("https://rahulshettyacademy.com/angularpractice/shop")

  // await page.locator(".card-body a").waitFor() -- this will fail if multiple elements are returned.
  // await page.locator(".card-body a").first().waitFor();
  const cardEl = await page.locator(".card-body a").nth(3);
  console.log(await cardEl.allTextContents());
});
