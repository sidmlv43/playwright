import { test, expect } from "@playwright/test";

test("Test Login form with empty username field and password field.", async ({
  page,
}) => {
  await page.goto("https://rahulshettyacademy.com/loginpagePractise");
  await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");

  // await page.locator("#username").fill("sid.mlv@gmail.com")
  // await page.locator("#password").fill("@Pass1234")
  await page.locator("#signInBtn").click();
  const error = await page.locator(".alert-danger");
  await expect(error).toBeVisible();
  const errTxt = await error.textContent();
  await expect(errTxt).toContain("Empty username/password.");
});

test("Test Login with invalid email and invalid password", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/loginpagePractise");
  await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");

  const usernameField = page.locator("#username");
  const passwordInputField = page.locator("#password");
  const signInBtn = page.locator("#signInBtn");
  await usernameField.fill("sid.mlv@gmail.com");
  await passwordInputField.fill("@Pass1234");
  await signInBtn.click();
  const error = await page.locator(".alert-danger");
  await expect(error).toBeVisible();
  const errTxt = await error.textContent();
  await expect(errTxt).toContain("Incorrect username/password.");
});

test("Test Login with correct username and correct password", async ({
  page,
}) => {
  await page.goto("https://rahulshettyacademy.com/loginpagePractise");
  await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");

  const usernameField = page.locator("#username");
  const passwordInputField = page.locator("#password");
  const signInBtn = page.locator("#signInBtn");
  await usernameField.fill("rahulshettyacademy");
  await passwordInputField.fill("learning");
  await signInBtn.click();
  await page.waitForLoadState("networkidle");

  // await page.waitForURL("https://rahulshettyacademy.com/angularpractice/shop")

  // await page.locator(".card-body a").waitFor() -- this will fail if multiple elements are returned.
  // await page.locator(".card-body a").first().waitFor();
  const cardEl = await page.locator(".card-body a").nth(3);
  console.log(await cardEl.allTextContents());
});

test("test sub window handling", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

  const [newPage] = await Promise.all([
    page.waitForEvent("popup"),
    page.locator(
      ".blinkingText", 
      {
        hasText: "Free Access to InterviewQues/ResumeAssistance/Material"
      }
    ).click(),
  ]);

  await newPage.waitForLoadState("domcontentloaded");
  await newPage.locator(".preloader").waitFor({ state: "hidden" });
  await newPage.locator(".red").waitFor();
  const emailToContact = await newPage.locator(".red").textContent();

  await expect(
    emailToContact?.includes(
      "Please email us at mentor@rahulshettyacademy.com with below template to receive response"
    )
  ).toBeTruthy();
});
