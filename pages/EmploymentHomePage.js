class EmploymentHomePage {
    constructor(page) {
      this.page = page;
      this.searchBox = page.getByRole('textbox', { name: 'Search employment.govt.nz' });
      this.pageTitle = page.getByRole('heading', { name: /Search results/i });
    }
  
    async navigate() {
      await this.page.goto('https://www.employment.govt.nz/');
    }
  
    async searchFor(keyword) {
      await this.searchBox.click();
      await this.searchBox.fill(keyword);
      await this.searchBox.press('Enter');
    }
  }
module.exports = { EmploymentHomePage };