import { BooksPage } from '../../src/pages/books.page';
import { CartPage } from '../../src/pages/cart.page';
import { ComputersPage } from '../../src/pages/computers.page';
import { HomePage } from '../../src/pages/home.page';
import test, { expect } from '@playwright/test';

test.describe('User can navigate between pages', () => {
  let booksPage: BooksPage;

  test.beforeEach(async ({ page }) => {
    booksPage = new BooksPage(page);

    await booksPage.goto();
  });

  test('User can navigate from the books page to computers page DWS-05-01', async ({
    page,
  }) => {
    //Arrange
    const computersPageTitle = 'Computers';
    const expectedUrl = 'computers';
    const computersPage = new ComputersPage(page);

    //Act
    await booksPage.mainMenu.goToComputersCategory();

    //Assert
    const title = await computersPage.getTitle();
    expect(title).toContain(computersPageTitle);

    const url = await computersPage.getUrl();
    expect(url).toContain(expectedUrl);
  });

  test('User can navigate from the category page to the cart DWS-05-02', async ({
    page,
  }) => {
    //Arrange
    const cartPageTitle = 'Shopping Cart';
    const expectedUrl = 'cart';
    const cartPage = new CartPage(page);

    //Act
    await booksPage.topMenu.goToShoppingCart();

    //Assert
    const title = await cartPage.getTitle();
    expect(title).toContain(cartPageTitle);

    const url = await cartPage.getUrl();
    expect(url).toContain(expectedUrl);
  });

  test('User can navigate to the cart from notification bar DWS-05-03', async ({
    page,
  }) => {
    //Arrange
    const cartPageTitle = 'Shopping Cart';
    const expectedUrl = 'cart';
    const cartPage = new CartPage(page);

    //Act
    const item = await booksPage.getRandomItemInStock();
    await booksPage.clickAddToCart(item);
    await booksPage.shoppingCartNotification.click();

    //Assert
    const title = await cartPage.getTitle();
    expect(title).toContain(cartPageTitle);

    const url = await cartPage.getUrl();
    expect(url).toContain(expectedUrl);
  });

  test('User can navigate to the home page by clicking logo DWS-05-04', async ({
    page,
  }) => {
    //Arrange
    const homePageTitle = 'Demo Web Shop';
    const homePage = new HomePage(page);

    //Act
    await booksPage.mainMenu.homePageLogo.click();

    //Assert
    const title = await homePage.getTitle();
    expect(title).toContain(homePageTitle);
  });
});
