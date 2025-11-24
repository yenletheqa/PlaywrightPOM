import { test } from './base.ts';

test('Book search', async ({ page, homePage, searchResultsPage, bookDetailsPage }) => {
  const bookName = 'The Playwright\'s Manifesto';
  const author = 'Paul Sirett - 2022';

  await homePage.goto();
  await homePage.searchBook('playwright');

  await searchResultsPage.selectBook(bookName);
  await bookDetailsPage.assertBookVisible(bookName, author);
});