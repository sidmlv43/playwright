import { test, expect, request } from "@playwright/test";



const userpayload = {
  userEmail: "sid.mlv@gmail.com",
  userPassword: "@Pass1234",
};

test.beforeAll(async () => {
  const apiContext = await request.newContext();

  const loginResponse = await apiContext.post(
    "https://rahulshettyacademy.com/api/ecom/auth/login",
    {
      data: { ...userpayload },
    },
  );

  expect(loginResponse.ok()).toBeTruthy();
  expect(loginResponse.status()).toBe(200);
  expect(await loginResponse.json()).toHaveProperty("token");
  expect(await loginResponse.json()).toHaveProperty("userId");

  console.log(await loginResponse.json());

  const loginResponseJSON = await loginResponse.json();
  const token = loginResponseJSON.token;
  const userId = loginResponseJSON.userId;
});

test.beforeEach(() => {});

test("test web api", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
});
