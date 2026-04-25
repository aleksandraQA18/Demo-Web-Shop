import { CategoryPage } from '../../src/pages/category.page';
import { HomePage } from '../../src/pages/home.page';
import { products } from '../../src/test-data/products';
import test, { expect } from '@playwright/test';

test.describe('User can navigate between pages', { tag: '@smoke' }, () => {
  let homePage: HomePage;
  let categoryPage: CategoryPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.goto();
    categoryPage = new CategoryPage(page);
  });

  test('DWS-101 Home page loads successfully', async () => {
    //Arrange
    const homePageTitle = 'Demo Web Shop';

    //Assert
    const title = await homePage.getTitle();
    expect(title).toContain(homePageTitle);

    await expect(homePage.homePageLogo).toBeVisible();
  });

  test('User can navigate to the home page by clicking logo DWS-05-04', async () => {
    //Arrange
    const homePageTitle = 'Demo Web Shop';

    //Act
    await categoryPage.clickHomePageLogo();

    //Assert
    const title = await homePage.getTitle();
    expect(title).toContain(homePageTitle);
  });

  test('User can navigate to the books page DWS-05-01', async () => {
    //Arrange
    const computersPageTitle = 'Books';
    const expectedUrl = 'books';

    //Act
    const booksPage = await categoryPage.goToBooksCategory();

    //Assert
    const title = await booksPage.getTitle();
    expect(title).toContain(computersPageTitle);

    const url = await booksPage.getUrl();
    expect(url).toContain(expectedUrl);
  });

  test('User can navigate to the cart from the category page DWS-05-02', async () => {
    //Arrange
    const cartPageTitle = 'Shopping Cart';
    const expectedUrl = 'cart';

    //Act
    const computersPage = await categoryPage.goToComputersCategory();
    const cartPage = await computersPage.goToShoppingCart();

    //Assert
    const title = await cartPage.getTitle();
    expect(title).toContain(cartPageTitle);

    const url = await cartPage.getUrl();
    expect(url).toContain(expectedUrl);
  });

  test('User can navigate to the cart from notification bar DWS-05-03', async () => {
    //Arrange
    const cartPageTitle = 'Shopping Cart';
    const expectedUrl = 'cart';
    const bookData = products[7];

    //Act
    await categoryPage.goToBooksCategory();
    const item = await categoryPage.getItemByTitle(bookData.title);
    await categoryPage.clickAddToCart(item);
    await categoryPage.shoppingCartNotification.click();

    //Assert
    const title = await categoryPage.getTitle();
    expect(title).toContain(cartPageTitle);

    const url = await categoryPage.getUrl();
    expect(url).toContain(expectedUrl);
  });
});
