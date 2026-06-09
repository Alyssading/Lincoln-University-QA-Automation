const { test, expect } = require('@playwright/test');

const { EmploymentHomePage } = require('../pages/EmploymentHomePage');

// 🎯 测试脚本层：直接调用上面的管家
test('Employment NZ Search using POM Architecture by Alyssa', async ({ page }) => {
  const employmentHome = new EmploymentHomePage(page);

  await employmentHome.navigate();
  await employmentHome.searchFor('Holiday Pay');

  // ------------------ 🛡️ 断言验证 ------------------
  await expect(page).toHaveURL(/search-results\?Search=Holiday\+Pay/, { timeout: 10000 });
  await expect(employmentHome.pageTitle).toBeVisible({ timeout: 10000 });

  const articleResult = page.getByText('Annual holiday pay').first();
  await expect(articleResult).toBeVisible({ timeout: 10000 }); 
});