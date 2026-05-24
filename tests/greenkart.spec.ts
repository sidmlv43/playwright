import { expect, test } from "@playwright/test";
import { GreenCartHomePage } from "../pob/GreenCartHomePage";

test("test cart is empty", async ({ page }) => {
  const greenKartHomePage = new GreenCartHomePage(page);
  await greenKartHomePage.goto();
  await greenKartHomePage.openCartModal();
  await greenKartHomePage.verifyCartModalIsEmpty();
});

test("add product to cart", async ({ page }) => {
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
 
});



test("Search Function is working", async ({page}) => {
  const greenKartPage = new GreenCartHomePage(page);
  await greenKartPage.goto()
  await greenKartPage.searchProduct("Tomato");
  await greenKartPage.verifySearchResult("Tomato");

})