const { test, expect } = require('@playwright/test');

test('Lincoln University Advanced Search and Content Verification', async ({ page }) => {
  // 1. Open the homepage
  await page.goto('https://www.lincoln.ac.nz/');

  // 2. Trigger search using the recorded locators
  await page.locator('div').filter({ hasText: 'Toggle Mobile Menu Lincoln' }).nth(3).click();
  await page.locator('#searchModalButton').click();
  
  const searchBox = page.getByRole('searchbox', { name: 'Search Input' });
  await searchBox.fill('Applied Computing'); 
  await searchBox.press('Enter');

  // ------------------ 🛡️ Assertions ------------------

  // Assertion 1: Verify the URL contains the keyword 'search'
  await expect(page).toHaveURL(/search/, { timeout: 15000 });

  // Assertion 2: Verify the main heading 'Search results' is visible
  const pageTitle = page.getByRole('heading', { name: /Search results/i });
  await expect(pageTitle).toBeVisible({ timeout: 15000 });

  // Assertion 3: Verify the specific course is listed in the search results
  const courseResult = page.getByText('Master of Applied Computing');
  await expect(courseResult).toBeVisible({ timeout: 15000 }); 
});