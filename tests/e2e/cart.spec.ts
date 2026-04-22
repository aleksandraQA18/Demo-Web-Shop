import { BooksPage } from '../../src/pages/books.page';
import { CartPage } from '../../src/pages/cart.page';
import { ItemPage } from '../../src/pages/item.page';
import test, { Locator, expect } from '@playwright/test';

test.describe('Verify adding, updating, and deleting item in cart for non-logged user', () => {
  let booksPage: BooksPage;
  let item: Locator;
  let itemPage: ItemPage;
  let title: string;
  let price: string;

  test.beforeEach(async ({ page }) => {
    booksPage = new BooksPage(page);
    await booksPage.goto();
    item = await booksPage.getRandomItemInStock();
    title = await booksPage.getItemTitle(item);
    price = await booksPage.getItemActualPrice(item);
    itemPage = await booksPage.goToItemPage(item);
    await itemPage.clickAddToCartButton();
  });

  test('add item from Books category DWS-04-01', async () => {
    //Arrange
    const expectedNotification =
      'The product has been added to your shopping cart';
    const expectedCartQty = '(1)';

    //Assert
    await expect
      .soft(booksPage.notificationBar)
      .toHaveText(expectedNotification);

    await expect(booksPage.topMenu.shoppingCartQty).toHaveText(expectedCartQty);
  });

  test('cart contains correct item DWS-04-01', async ({ page }) => {
    //Arrange
    const cartPage = new CartPage(page);

    //Act
    await itemPage.topMenu.goToShoppingCart();

    //Assert
    await expect(cartPage.productName).toHaveText(title, {
      useInnerText: true,
    });

    await expect(cartPage.productUnitPrice).toHaveText(price);
  });

  test('edit item quantity in the cart DWS-04-02', async ({ page }) => {
    //Arrange
    const expectedQty = '3';
    const subTotalPrice = (Number(expectedQty) * parseFloat(price)).toFixed(2);
    const cartPage = new CartPage(page);

    //Act
    await itemPage.topMenu.goToShoppingCart();
    await cartPage.editItemQty(expectedQty);

    //Assert
    await expect(cartPage.qtyInput).toHaveValue(expectedQty);
    await expect(cartPage.productSubtotal).toHaveText(String(subTotalPrice));
  });

  test('delete item from the cart DWS-04-03', async ({ page }) => {
    //Arrange
    const cartPage = new CartPage(page);
    const expectedMessage = 'Your Shopping Cart is empty!';
    const expectedCartQty = '(0)';

    //Act
    await itemPage.topMenu.goToShoppingCart();
    await cartPage.deleteItem();

    //Assert
    await expect.soft(cartPage.orderContent).toHaveText(expectedMessage);
    await expect(cartPage.topMenu.shoppingCartQty).toHaveText(expectedCartQty);
  });
});
