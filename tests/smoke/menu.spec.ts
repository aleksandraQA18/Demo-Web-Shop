import { BooksPage } from '../../src/pages/books.page';
import { ComputersPage } from '../../src/pages/computers.page';
import { HomePage } from '../../src/pages/home.page';
import test, { expect } from '@playwright/test';

test.describe('Verify main menu navigation', { tag: '@smoke' }, () => {
  test('computers button navigates to computers page', async ({ page }) => {
    //Arrange
    const booksPage = new BooksPage(page);
    const computersPage = new ComputersPage(page);
    const expectedTitle = 'Demo Web Shop. Computers';

    //Act
    await booksPage.goto();
    await booksPage.mainMenu.computersButton.click();
    const title = await computersPage.getTitle();

    //Assert
    expect(title).toEqual(expectedTitle);
  });

  test('home page button navigates to home page', async ({ page }) => {
    //Arrange
    const booksPage = new BooksPage(page);
    const homePage = new HomePage(page);
    const expectedTitle = 'Demo Web Shop';

    //Act
    await booksPage.goto();
    await booksPage.mainMenu.homePage.click();
    const title = await homePage.getTitle();

    //Assert
    expect(title).toEqual(expectedTitle);
  });
});
