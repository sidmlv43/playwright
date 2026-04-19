import { test, expect } from "@playwright/test";
import { PlaywrightDevPage } from "../pob/PlaywrightDevPage";

test("Page Object Model", async ({ page }) => {
  const playwrightDevPage = new PlaywrightDevPage(page);

  await playwrightDevPage.goto();
  await playwrightDevPage.pageObjectModel();

  const tocListCount = await playwrightDevPage.tocList.count();
  console.log(`Number of items in the Table of Contents: ${tocListCount}`);
  expect(tocListCount).toBeGreaterThan(0);
});
