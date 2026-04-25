import { BASE_URL } from '../../src/global-setup';
import { CategoryPage } from '../../src/pages/category.page';
import { HomePage } from '../../src/pages/home.page';
import { mainMenuLinks, topMenuLinks } from '../../src/test-data/navigation';
import { products } from '../../src/test-data/products';
import test, { expect } from '@playwright/test';

test.describe('User can navigate between pages', { tag: '@smoke' }, () => {
  let homePage: HomePage;
  let categoryPage: CategoryPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.goto();
  });

  test('DWS-101 Home page loads successfully', async () => {
    //Arrange
    const homePageTitle = 'Demo Web Shop';

    //Assert
    const title = await homePage.getTitle();
    expect(title).toContain(homePageTitle);

    await expect(homePage.homePageLogo).toBeVisible();
  });

  test('DWS-102 User can access register, log in, cart and wishlist from top menu', async ({
    page,
  }) => {
    //Act
    for (const link of topMenuLinks) {
      await test.step(`Navigate to ${link.name}`, async () => {
        await homePage.topMenu.clickTopMenuLink(link.name);

        await expect(page).toHaveURL(new RegExp(`/${link.urlPart}$`));
      });
    }
  });

  test('DWS-103 User can navigate to categories from header category menu', async ({
    page,
  }) => {
    //Arrange
    categoryPage = new CategoryPage(page);

    //Act

    for (const link of mainMenuLinks) {
      await test.step(`Navigate to ${link.name}`, async () => {
        await homePage.mainMenu.clickMainMenuCategory(link.name);

        await expect(page).toHaveURL(new RegExp(`/${link.urlPart}$`));
        const isLoaded = await categoryPage.isProductsGridLoaded();
        expect(isLoaded).toBe(true);
      });
    }
  });

  test('DWS-104 User can navigate to cart from notification bar', async ({
    page,
  }) => {
    //Arrange
    categoryPage = new CategoryPage(page);
    const expectedTitle = 'Shopping Cart';
    const expectedUrl = 'cart';
    const bookData = products[7];

    //Act
    await homePage.mainMenu.clickMainMenuCategory('books');
    await categoryPage.clickAddToCart(bookData.title);
    await categoryPage.shoppingCartNotification.click();

    //Assert
    const title = await categoryPage.getTitle();
    expect(title).toContain(expectedTitle);

    const url = await categoryPage.getUrl();
    expect(url).toContain(expectedUrl);
  });

  test('DWS-105 Clicking logo redirects to home page', async ({ page }) => {
    //Arrange
    const expectedTitle = 'Demo Web Shop';

    //Act
    await homePage.topMenu.clickTopMenuLink('cart');
    await homePage.homePageLogo.click();

    //Assert
    const title = await homePage.getTitle();
    expect(title).toContain(expectedTitle);

    await expect(page).toHaveURL(BASE_URL);
  });

  test(
    'DWS-106 Navigation preserves application state (cart count remains consistent)',
    { tag: '@regression' },
    async ({ page }) => {
      //Arrange
      const expectedQty = '(1)';
      categoryPage = new CategoryPage(page);
      const bookData = products[7];

      //Act
      await homePage.mainMenu.clickMainMenuCategory('books');
      await categoryPage.clickAddToCart(bookData.title);

      //Assert
      await expect(homePage.topMenu.shoppingCartQty).toHaveText(expectedQty);

      for (const link of topMenuLinks) {
        await test.step(`Navigate to ${link.name}`, async () => {
          await homePage.topMenu.clickTopMenuLink(link.name);

          await expect(homePage.topMenu.shoppingCartQty).toHaveText(
            expectedQty,
          );
        });
      }
    },
  );
});
