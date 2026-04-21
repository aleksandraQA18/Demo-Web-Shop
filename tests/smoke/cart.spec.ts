import { BooksPage } from '../../src/pages/books.page';
import test, { Locator, expect } from '@playwright/test';

test.describe('User can add items to cart', () => {
  let booksPage: BooksPage;
  let item: Locator;

  test.beforeEach(async ({ page }) => {
    booksPage = new BooksPage(page);
    await booksPage.goto();
    item = await booksPage.getRandomItemInStock();
    await booksPage.clickAddToCart(item);
  });

  test(
    'add book to cart from the list DWS-02-06',
    { tag: '@smoke' },
    async () => {
      //Arrange
      const expectedNotification =
        'The product has been added to your shopping cart';

      //Assert
      await expect
        .soft(booksPage.notificationBar)
        .toHaveText(expectedNotification);

      await expect(booksPage.cartItemQty).toHaveText('(1)');
    },
  );

  test(
    'mini shopping cart displays correct item details DWS-02-06',
    { tag: '@smoke' },
    async () => {
      //Arrange
      const itemTitle = await booksPage.getItemTitle(item);
      const itemActualPrice = await booksPage.getItemActualPrice(item);

      //Assert
      await expect(booksPage.shoppingCartName).toHaveText(itemTitle);
      await expect(booksPage.shoppingUnitPrice).toHaveText(itemActualPrice);
      await expect(booksPage.shoppingQty).toHaveText('1');
    },
  );
});
