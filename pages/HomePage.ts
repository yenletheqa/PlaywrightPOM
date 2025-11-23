import { Page, Locator } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly searchBox: Locator;

  static #URL = 'https://books-pwakit.appspot.com/';

  constructor(page: Page) {
    this.page = page;
    this.searchBox = page.getByRole('searchbox', { name: 'Search Books' });
  }

  async goto() {
    await this.page.goto(HomePage.#URL);
  }

  async searchBook(keyword: string) {
    await this.searchBox.click();
    await this.searchBox.fill(keyword);
    await this.searchBox.press('Enter');
  }
}
