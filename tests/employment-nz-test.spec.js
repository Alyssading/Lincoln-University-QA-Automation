const { test, expect } = require('@playwright/test');

test('Employment NZ Search and Content Verification by Alyssa', async ({ page }) => {
  // 1. Open the Employment New Zealand homepage
  await page.goto('https://www.employment.govt.nz/');

  // 2. Locate the real search textbox using the Codegen locator
  const searchBox = page.getByRole('textbox', { name: 'Search employment.govt.nz' });
  
  // 3. Click, type the keyword, and press Enter
  await searchBox.click();
  await searchBox.fill('Holiday Pay');
  await searchBox.press('Enter');

 // ------------------ 🛡️ Assertions ------------------

  // Assertion 1: Verify the URL contains the real search parameters
  // We updated the pattern from /search\?q=/ to /search-results\?Search=/ based on the actual website behavior
  await expect(page).toHaveURL(/search-results\?Search=Holiday\+Pay/, { timeout: 10000 });

  // Assertion 2: Verify the main search result heading is visible
  const pageTitle = page.getByRole('heading', { name: /Search results/i });
  await expect(pageTitle).toBeVisible({ timeout: 10000 });

 // Assertion 3: Verify that the top search result contains the relevant legal topic
  // We added .first() to resolve the strict mode violation (5 elements found)
  const articleResult = page.getByText('Annual holiday pay').first();
  await expect(articleResult).toBeVisible({ timeout: 10000 });
});