import { expect, test } from '@_src/fixtures/merged.fixtures';
import { products } from '@_src/test-data/products';
import { BASE_URL } from 'config/env.config';

test.describe('User can navigate between pages', { tag: '@smoke' }, () => {
  test('DWS-101 Home page loads successfully @logged', async ({ homePage }) => {
    //Arrange
    const homePageTitle = 'Demo Web Shop';

    //Assert
    const title = await homePage.getTitle();
    expect(title).toContain(homePageTitle);

    await expect(homePage.topMenu.homePageLogo).toBeVisible();
  });

  test('DWS-102 User can access register, log in, cart and wishlist from top menu', async ({
    homePage,
  }) => {
    await test.step('User can access register from top menu', async () => {
      //Act
      const registerPage = await homePage.topMenu.selectRegister();

      //Assert
      const pageUrl = await registerPage.getUrl();
      expect(pageUrl).toContain(registerPage.url);
    });

    await test.step('User can access log in from top menu', async () => {
      //Act
      await homePage.goto();
      const loginPage = await homePage.topMenu.selectLogin();

      //Assert
      const pageUrl = await loginPage.getUrl();
      expect(pageUrl).toContain(loginPage.url);
    });

    await test.step('User can access cart from top menu', async () => {
      //Act
      await homePage.goto();
      const cartPage = await homePage.topMenu.selectCart();

      //Assert
      const pageUrl = await cartPage.getUrl();
      expect(pageUrl).toContain(cartPage.url);
    });

    await test.step('User can access wishlist from top menu', async () => {
      //Act
      await homePage.goto();
      const wishListPage = await homePage.topMenu.selectWishlist();

      //Assert
      const pageUrl = await wishListPage.getUrl();
      expect(pageUrl).toContain(wishListPage.url);
    });
  });

  test('DWS-103 User can navigate to main categories from header category menu', async ({
    homePage,
  }) => {
    await test.step('User can access Book category', async () => {
      //Arrange
      const expectedUrl = '/books';

      //Act
      const bookPage = await homePage.mainMenu.selectBooks();

      //Assert
      const pageUrl = await bookPage.getUrl();
      expect(pageUrl).toContain(expectedUrl);
    });

    await test.step('User can access Computers category', async () => {
      //Arrange
      const expectedUrl = '/computers';

      //Act
      const computersPage = await homePage.mainMenu.selectComputers();

      //Assert
      const pageUrl = await computersPage.getUrl();
      expect(pageUrl).toContain(expectedUrl);
    });

    await test.step('User can access Electronics category', async () => {
      //Arrange
      const expectedUrl = '/electronics';

      //Act
      const electronicsPage = await homePage.mainMenu.selectElectronics();

      //Assert
      const pageUrl = await electronicsPage.getUrl();
      expect(pageUrl).toContain(expectedUrl);
    });

    await test.step('User can access Apparel & Shoes category', async () => {
      //Arrange
      const expectedUrl = '/apparel-shoes';

      //Act
      const apparealPage = await homePage.mainMenu.selectApparelShoes();

      //Assert
      const pageUrl = await apparealPage.getUrl();
      expect(pageUrl).toContain(expectedUrl);
    });

    await test.step('User can access Digital Downloads category', async () => {
      //Arrange
      const expectedUrl = '/digital-downloads';

      //Act
      const digitalPage = await homePage.mainMenu.selectDigitalDownloads();

      //Assert
      const pageUrl = await digitalPage.getUrl();
      expect(pageUrl).toContain(expectedUrl);
    });

    await test.step('User can access Jewelry category', async () => {
      //Arrange
      const expectedUrl = '/jewelry';

      //Act
      const jewelryPage = await homePage.mainMenu.selectJewelry();

      //Assert
      const pageUrl = await jewelryPage.getUrl();
      expect(pageUrl).toContain(expectedUrl);
    });

    await test.step('User can access Gift Cards category', async () => {
      //Arrange
      const expectedUrl = '/gift-cards';

      //Act
      const giftCardsPage = await homePage.mainMenu.selectGiftCards();

      //Assert
      const pageUrl = await giftCardsPage.getUrl();
      expect(pageUrl).toContain(expectedUrl);
    });
  });

  test('DWS-104 User can navigate to cart from notification bar', async ({
    homePage,
  }) => {
    //Arrange
    const expectedTitle = 'Shopping Cart';
    const expectedUrl = 'cart';
    const bookProduct = products.find(
      (p) => p.categoryUrl === 'books' && p.inStock,
    );

    //Act
    const categoryPage = await homePage.mainMenu.selectBooks();
    await categoryPage.clickAddToCart(bookProduct!.title);
    await categoryPage.shoppingCartNotification.click();

    //Assert
    const title = await categoryPage.getTitle();
    expect(title).toContain(expectedTitle);

    const url = await categoryPage.getUrl();
    expect(url).toContain(expectedUrl);
  });

  test('DWS-105 User can return to the home page by clicking the logo', async ({
    homePage,
  }) => {
    //Arrange
    const expectedTitle = 'Demo Web Shop';

    //Act
    await homePage.topMenu.selectCart();
    await homePage.topMenu.homePageLogo.click();

    //Assert
    const title = await homePage.getTitle();
    expect(title).toContain(expectedTitle);

    const url = await homePage.getUrl();
    expect(url).toContain(BASE_URL);
  });

  test(
    'DWS-106 Cart count is preserved during navigation',
    { tag: '@regression' },
    async ({ homePage }) => {
      //Arrange
      const expectedQty = '(1)';
      const bookProduct = products.find(
        (p) => p.categoryUrl === 'books' && p.inStock,
      );

      //Act
      const categoryPage = await homePage.mainMenu.selectBooks();
      await categoryPage.clickAddToCart(bookProduct!.title);

      //Assert
      await expect(homePage.topMenu.shoppingCartQty).toHaveText(expectedQty);

      await homePage.topMenu.selectLogin();

      await expect(homePage.topMenu.shoppingCartQty).toHaveText(expectedQty);
    },
  );
});
