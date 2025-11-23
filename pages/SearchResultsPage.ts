import {Page, Locator} from '@playwright/test';

export class SearchResultsPage {
    readonly page: Page;
    
    constructor(page: Page) {
        this.page = page;
    }
    async selectBook(name: string) {
        await this.page.getByRole('link', { name }).click();
    }
}