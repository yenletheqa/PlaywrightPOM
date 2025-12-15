import { Page, expect } from '@playwright/test';

export class BookDetailsPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goBack() {
    await this.page.getByRole('link', { name: 'Go back' }).click();
  }

  async assertBookVisible(name: string, author: string) {
    await expect(this.page.getByRole('heading', { name })).toBeVisible();
    await expect(this.page.locator('book-detail')).toContainText(author);
  }
}
