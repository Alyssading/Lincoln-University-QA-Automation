const { test, expect } = require('@playwright/test');

test('在林肯官网执行搜索功能测试', async ({ page }) => {
  // 1. 访问官网
  await page.goto('https://www.lincoln.ac.nz/');

  // 2. 找到搜索按钮并点击 (林肯官网通常有一个放大镜图标)
  // 我们使用 getByRole 来精准定位
  await page.getByRole('button', { name: 'Search' }).first().click();

  // 3. 在搜索框里输入 "Master of Applied Computing"
  // 假设搜索框出现后，我们向它输入你的专业
  await page.getByPlaceholder('Search...').fill('Master of Applied Computing');

  // 4. 按下回车键
  await page.keyboard.press('Enter');

  // 5. 断言：页面应该跳转，并显示搜索结果
  await expect(page).toContainURL(/search/);
  console.log('搜索功能自动化测试完成！');
});