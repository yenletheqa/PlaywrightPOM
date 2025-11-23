import { test as base } from '@playwright/test';
import { HomePage, SearchResultsPage, BookDetailsPage } from '../pages';

type MyFixture = {
    homePage: HomePage
    searchResultsPage: SearchResultsPage
    bookDetailsPage: BookDetailsPage
};

export const test = base.extend<MyFixture>({
    homePage: async ({ page }, use) => {
        const homePage = new HomePage(page);
        await use(homePage);
    },
    searchResultsPage: async ({ page }, use) => {
        const searchResultsPage = new SearchResultsPage(page);
        await use(searchResultsPage);
    },
    bookDetailsPage: async ({ page }, use) => {
        const bookDetailsPage = new BookDetailsPage(page);
        await use(bookDetailsPage);
    },
});
