const { test, expect } = require('@playwright/test');

test('在林肯官网执行搜索功能测试', async ({ page }) => {
  // 1. 延长超时时间到 60 秒，彻底解决新西兰网站在国内加载慢的问题
  test.setTimeout(60000);

  // 2. 访问林肯大学首页，等待网络处于相对空闲状态
  await page.goto('https://www.lincoln.ac.nz/', { waitUntil: 'networkidle' });

  // 3. 【新增步骤】先点击右上角的搜索放大镜按钮，让输入框弹出来
  // 林肯官网目前的搜索按钮通常是一个带有 '.search-toggle' 类名或 search 角色的元素
  const searchButton = page.getByRole('button', { name: /search/i }).first();
  await searchButton.waitFor({ state: 'visible', timeout: 10000 });
  await searchButton.click();

  // 4. 等待输入框出现并输入内容
  // 我们改用更通用的 getByRole 或者是林肯官网实际的 ID
  const searchInput = page.locator('input[type="search"], input[placeholder*="Search"]').first();
  await searchInput.waitFor({ state: 'visible', timeout: 15000 });
  await searchInput.fill('Master of Applied Computing');

  // 5. 按下回车键
  await searchInput.press('Enter');

  // 6. 验证跳转后的 URL 是否包含 search
  await page.waitForURL(/.*search.*/, { timeout: 15000 });
  await expect(page).toHaveURL(/.*search.*/);

  console.log('搜索功能自动化测试完成！');
});