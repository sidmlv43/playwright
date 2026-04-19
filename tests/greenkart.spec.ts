import { expect, test } from "@playwright/test";
import { GreenCartHomePage } from "../pob/GreenCartHomePage";

test("test cart is empty", async ({ page }) => {
  const greenKartHomePage = new GreenCartHomePage(page);
  await greenKartHomePage.goto();
  await greenKartHomePage.openCartModal();
  await greenKartHomePage.verifyCartModalIsEmpty();
});

test.only("add product to cart", async ({ page }) => {
  const greenKartHomePage = new GreenCartHomePage(page);
  await greenKartHomePage.goto();
  await greenKartHomePage.addProductsToCart(
    "Brocolli",
    "Brinjal",
    "Carrot",
    "Mushroom",
  );
  await greenKartHomePage.openCartModal();
  await greenKartHomePage.cartModal.isVisible();
  await greenKartHomePage.verifyCartHasAddedProducts(
    "Brocolli",
    "Brinjal",
    "Carrot",
    "Mushroom",
  );
  await page.pause();
});
