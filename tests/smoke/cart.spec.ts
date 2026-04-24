import { CategoryPage } from '../../src/pages/category.page';
import { products } from '../../src/test-data/products';
import test, { expect } from '@playwright/test';

test.describe('User can add items to cart', () => {
  let categoryPage: CategoryPage;

  test.beforeEach(async ({ page }) => {
    categoryPage = new CategoryPage(page);
    await categoryPage.goto('books');
  });

  test(
    'add book to cart from the list DWS-02-06',
    { tag: '@smoke' },
    async () => {
      //Arrange
      const bookData = products[7];
      const bookItem = await categoryPage.getItemByTitle(bookData.title);
      const expectedNotification =
        'The product has been added to your shopping cart';

      //Act
      await categoryPage.clickAddToCart(bookItem);

      //Assert
      await expect
        .soft(categoryPage.notificationBar)
        .toHaveText(expectedNotification);

      await expect(categoryPage.cartItemQty).toHaveText('(1)');
    },
  );

  test(
    'mini shopping cart displays correct item details DWS-02-06',
    { tag: '@smoke' },
    async () => {
      //Arrange
      const bookData = products[7];
      const bookItem = await categoryPage.getItemByTitle(bookData.title);
      const itemTitle = bookData.title;
      const itemActualPrice = bookData.price.toFixed(2);

      //Act
      await categoryPage.clickAddToCart(bookItem);

      //Assert
      await expect(categoryPage.shoppingCartName).toHaveText(itemTitle);
      await expect(categoryPage.shoppingUnitPrice).toHaveText(itemActualPrice);
      await expect(categoryPage.shoppingQty).toHaveText('1');
    },
  );

  test(
    'mini shopping cart should not display Add to cart button for items out of stock DWS-02-04',
    { tag: '@smoke' },
    async () => {
      //Arrange
      //Arrange
      const bookItem = products[10];
      const bookItemLocator = await categoryPage.getItemByTitle(bookItem.title);
      const addTocart = bookItemLocator.filter({
        has: categoryPage.addToCartButton,
      });

      //Assert
      await expect(addTocart).toBeHidden();
    },
  );
});
