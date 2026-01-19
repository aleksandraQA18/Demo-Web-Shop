import { BooksPage } from '../../src/pages/books.page';
import { ComputersPage } from '../../src/pages/computers.page';
import { HomePage } from '../../src/pages/home.page';
import test, { expect } from '@playwright/test';

test.describe('Verify main menu navigation', { tag: '@smoke' }, () => {
  let booksPage: BooksPage;

  test.beforeEach(async ({ page }) => {
    booksPage = new BooksPage(page);
    await booksPage.goto();
  });

  test('home page button navigates to home page DWS-01-02', async ({
    page,
  }) => {
    //Arrange
    const homePage = new HomePage(page);
    const expectedTitle = 'Demo Web Shop';

    //Act
    await booksPage.mainMenu.homePageLogo.click();
    const title = await homePage.getTitle();

    //Assert
    expect(title).toEqual(expectedTitle);
  });

  test('navigate to Books category DWS-01-03', { tag: '@smoke' }, async () => {
    //Arrange
    const expectedTitle = 'Demo Web Shop. Books';

    //Assert
    const title = await booksPage.getTitle();
    expect(title).toEqual(expectedTitle);
  });

  test('computers button navigates to computers page DWS-01-04', async ({
    page,
  }) => {
    //Arrange
    const computersPage = new ComputersPage(page);
    const expectedTitle = 'Demo Web Shop. Computers';

    //Act
    await booksPage.mainMenu.computersButton.click();
    const title = await computersPage.getTitle();

    //Assert
    expect(title).toEqual(expectedTitle);
  });
});
