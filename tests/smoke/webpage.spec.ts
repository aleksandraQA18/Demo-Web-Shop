import { BooksPage } from '../../src/pages/books.page';
import { HomePage } from '../../src/pages/home.page';
import { expect, test } from '@playwright/test';

test.describe('Verify application main pages', () => {
  test('home page title', { tag: '@smoke' }, async ({ page }) => {
    //Arrange
    const homePage = new HomePage(page);
    const expectedTitle = 'Demo Web Shop';

    //Act
    await homePage.goto();

    //Assert
    const title = await homePage.getTitle();
    expect(title).toEqual(expectedTitle);
  });

  test('navigate to Books category', { tag: '@smoke' }, async ({ page }) => {
    //Arrange
    const booksPage = new BooksPage(page);
    const expectedTitle = 'Demo Web Shop. Books';

    //Act
    await booksPage.goto();

    //Assert
    const title = await booksPage.getTitle();
    expect(title).toEqual(expectedTitle);
  });
});
