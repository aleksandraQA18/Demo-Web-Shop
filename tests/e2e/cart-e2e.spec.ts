import { Product } from '../../src/models/product.model';
import { ItemPage } from '../../src/pages/item.page';
import { products } from '../../src/test-data/products';
import test, { expect } from '@playwright/test';

test.describe('Verify adding, updating, and deleting item in cart for non-logged user', () => {
  let itemPage: ItemPage;
  let item: Product;

  test.beforeEach(async ({ page }) => {
    itemPage = new ItemPage(page);
    item = products[3];
    await itemPage.goto(item.url);
    await itemPage.clickAddToCartButton();
  });

  test('cart contains correct item DWS-04-01', async () => {
    //Arrange
    const expectedTitle = item.title;
    const expectedPrice = item.price.toFixed(2);

    await expect(itemPage.topMenu.shoppingCartQty).toBeVisible();

    //Act
    const cartPage = await itemPage.goToShoppingCart();

    //Assert
    await expect(cartPage.productName).toHaveText(expectedTitle, {
      useInnerText: true,
    });

    await expect(cartPage.productUnitPrice).toHaveText(expectedPrice);
  });

  test('edit item quantity in the cart DWS-04-02', async () => {
    //Arrange
    const expectedQty = '3';
    const itemPrice = item.price;
    const expectedSubTotalPrice = (Number(expectedQty) * itemPrice).toFixed(2);

    await expect(itemPage.topMenu.shoppingCartQty).toBeVisible();

    //Act
    const cartPage = await itemPage.goToShoppingCart();
    await cartPage.editItemQty(expectedQty);

    //Assert
    await expect(cartPage.qtyInput).toHaveValue(expectedQty);
    await expect(cartPage.productSubtotal).toHaveText(expectedSubTotalPrice);
  });

  test('delete item from the cart DWS-04-03', async () => {
    //Arrange
    const expectedMessage = 'Your Shopping Cart is empty!';

    await expect(itemPage.topMenu.shoppingCartQty).toBeVisible();

    //Act
    const cartPage = await itemPage.goToShoppingCart();
    await cartPage.deleteItem();

    //Assert
    await expect.soft(cartPage.orderContent).toHaveText(expectedMessage);
  });
});
