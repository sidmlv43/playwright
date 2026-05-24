import { expect, type Locator, type Page } from "@playwright/test";

export class GreenCartHomePage {
  readonly page: Page;
  readonly brandLogo: Locator;
  readonly searchBox: Locator;
  readonly searchButton: Locator;
  readonly productList: Locator;
  readonly cartIcon: Locator;
  readonly proceedToCheckoutButton: Locator;
  readonly cartModal: Locator;
  readonly emptyCart: Locator;
  readonly cartItems: Locator;

  constructor(page: Page) {
    this.page = page;
    this.brandLogo = page.locator(".brand.greenLogo");
    this.searchBox = page.getByPlaceholder("Search for Vegetables and Fruits");
    this.searchButton = page.locator(".search-button");
    this.productList = page.locator(".products");
    this.cartIcon = page.locator(".cart-icon");
    this.proceedToCheckoutButton = page.getByRole("button").filter({
      hasText: "PROCEED TO CHECKOUT",
    });
    this.cartModal = page.locator(".cart-preview");
    this.emptyCart = page.getByRole("heading", {
      name: "You cart is empty!",
    });

    this.cartItems = page.locator(".cart-items");
  }

  productCard(productName: string): Locator {
    return this.page.locator(".product").filter({ hasText: productName });
  }

  addToCartButton(productName: string): Locator {
    return this.productCard(productName).locator(
      "button:has-text('ADD TO CART')",
    );
  }

  getCartItem(prodName: string): Locator {
    return this.cartItems.getByRole("listitem").filter({
      hasText: prodName,
    });
  }

  /**
   * Action methods
   */

  async goto() {
    await this.page.goto("https://rahulshettyacademy.com/seleniumPractise/#/");
  }

  async searchProduct(prodName: string) {
    await this.searchBox.fill(prodName);
    await this.searchButton.click();
  }

  async openCartModal() {
    await this.cartIcon.click();
  }

  async gotoCartPage() {
    await expect(this.cartModal).toBeVisible();
    await this.proceedToCheckoutButton.click();
  }

  async addProductToCart(prodName: string) {
    await this.addToCartButton(prodName).click();
  }

  async addProductsToCart(...prodList: string[]) {
    for (const prod of prodList) {
      await this.addProductToCart(prod);
    }
  }

  /**
   * Verification methods
   */

  async verifyCartModalIsEmpty() {
    await expect(this.emptyCart).toBeVisible();
    await expect(this.emptyCart).toBeAttached();
  }

  async verifyCartHasAddedProducts(...prodList: string[]) {
    for (const prod of prodList) {
      const cartItem = await this.getCartItem(prod);
      console.log("cart item = " + cartItem);
      expect(cartItem.isVisible()).toBeTruthy();
    }
  }

  async verifySearchResult(prod: string) {
    const productTitles = await this.page.locator(".product").allTextContents();
    expect(
      productTitles.length == 1,
      "Expected search result to be exact 1 but got " +
        productTitles.length +
        " results instead",
    );

    expect(productTitles[0].includes(prod));
  }
}

/**
 * 
 *                 ((JavascriptExecutor) driver).executeScript(
                        "arguments[0].scrollIntoView({block:'center', inline:'center'});",
                        element
                );

 */
