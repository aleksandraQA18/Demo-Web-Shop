import { BooksPage } from '../../src/pages/books.page';
import { products } from '../../src/test-data/products';
import test, { expect } from '@playwright/test';

test.describe('User can add items to cart', () => {
  let booksPage: BooksPage;

  test.beforeEach(async ({ page }) => {
    booksPage = new BooksPage(page);
    await booksPage.goto();
  });

  test(
    'add book to cart from the list DWS-02-06',
    { tag: '@smoke' },
    async () => {
      //Arrange
      const bookItem = products[7];
      const bookItemLocator = await booksPage.getItemByTitle(bookItem.title);
      const expectedNotification =
        'The product has been added to your shopping cart';

      //Act
      await booksPage.clickAddToCart(bookItemLocator);

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
      const bookItem = products[7];
      const bookItemLocator = await booksPage.getItemByTitle(bookItem.title);
      const itemTitle = bookItem.title;
      const itemActualPrice = bookItem.price.toFixed(2);

      //Act
      await booksPage.clickAddToCart(bookItemLocator);

      //Assert
      await expect(booksPage.shoppingCartName).toHaveText(itemTitle);
      await expect(booksPage.shoppingUnitPrice).toHaveText(itemActualPrice);
      await expect(booksPage.shoppingQty).toHaveText('1');
    },
  );

  test(
    'mini shopping cart should not display Add to cart button for items out of stock DWS-02-04',
    { tag: '@smoke' },
    async () => {
      //Arrange
      //Arrange
      const bookItem = products[10];
      const bookItemLocator = await booksPage.getItemByTitle(bookItem.title);
      const addTocart = bookItemLocator.filter({
        has: booksPage.addToCartButton,
      });

      //Assert
      await expect(addTocart).toBeHidden();
    },
  );
});
