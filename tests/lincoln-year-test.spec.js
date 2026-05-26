const { test, expect } = require('@playwright/test');

test('Lincoln University Course Search Test by Alyssa', async ({ page }) => {
  // 1. 自动打开官网首页
  await page.goto('https://www.lincoln.ac.nz/');

  // 2. 点击手机端菜单（Codegen 帮我们发现的林肯大学特有按钮布局）
  await page.locator('div').filter({ hasText: 'Toggle Mobile Menu Lincoln' }).nth(3).click();
  
  // 3. 点击弹出模态框里的搜索按钮
  await page.locator('#searchModalButton').click();

  // 4. 定位到真正的搜索框，并输入你想搜索的专业
  const searchBox = page.getByRole('searchbox', { name: 'Search Input' });
  await searchBox.fill('Master of Applied Computing');

  // 5. 按下回车键进行搜索
  await searchBox.press('Enter');

  // 6. 【断言】：因为有 Cloudflare 的存在，网页跳转可能会慢。
  // 我们聪明地等待网址（URL）里只要变出了包含 search 的字样，就算大功告成！
  await expect(page).toHaveURL(/search/, { timeout: 15000 });
});