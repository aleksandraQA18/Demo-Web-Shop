import { Product } from '@_src/models/product.model';
import { CartPage } from '@_src/pages/cart.page';
import { ProductPage } from '@_src/pages/product.page';
import { products } from '@_src/test-data/products';
import test, { expect } from '@playwright/test';

test.describe('Cart Management', () => {
  let productPage: ProductPage;
  let item: Product;
  let cartPage: CartPage;

  test.beforeEach(async ({ page }) => {
    productPage = new ProductPage(page);
    item = products.find((p) => p.categoryUrl === 'books')!;
    cartPage = new CartPage(page);
    await productPage.goto(item.url);
    await productPage.clickAddToCartButton();
    await productPage.topMenu.clickTopMenuLink('cart');
  });

  test(
    'DWS-401 Cart reflects correct price and quantity',
    { tag: '@regression' },
    async () => {
      // Arrange
      const expectedTitle = item.title;
      const expectedPrice = item.price.toFixed(2);

      // Assert
      await expect(cartPage.productName).toHaveText(expectedTitle);

      await expect(cartPage.productUnitPrice).toHaveText(expectedPrice);
    },
  );

  test(
    'DWS-402 User can change product quantity',
    { tag: '@smoke' },
    async () => {
      //Arrange
      const expectedQty = '3';

      //Act
      await cartPage.editItemQty(expectedQty);

      //Assert
      await expect(cartPage.qtyInput).toHaveValue(expectedQty);
    },
  );

  test(
    'DWS-403 Updating quantity recalculates total price',
    { tag: '@regression' },
    async () => {
      //Arrange
      const expectedQty = '3';
      const itemPrice = item.price;
      const expectedSubTotalPrice = (Number(expectedQty) * itemPrice).toFixed(
        2,
      );

      //Act
      await cartPage.editItemQty(expectedQty);

      //Assert
      await expect(cartPage.productSubtotal).toHaveText(expectedSubTotalPrice);
    },
  );

  test(
    'DWS-404 User can remove product from cart',
    { tag: '@smoke' },
    async () => {
      //Arrange
      const expectedMessage = 'Your Shopping Cart is empty!';

      //Act
      await cartPage.deleteItem();

      //Assert
      await expect.soft(cartPage.orderContent).toHaveText(expectedMessage);
    },
  );

  test(
    'DWS-405 Cart data persists after page refresh',
    { tag: '@regression' },
    async () => {
      //Arrange
      const item2 = products.find((p) => p.categoryUrl === 'cell-phones')!;

      //Act - add and edit second product
      await productPage.goto(item2.url);
      await productPage.clickAddToCartButton();
      await productPage.topMenu.clickTopMenuLink('cart');
      await cartPage.editItemQty('4', 1);

      //verify if quantity is updated
      await expect.soft(cartPage.qtyInput.last()).toHaveValue('4');

      //reload a page
      await cartPage.reloadPage();

      //Assert
      await expect(cartPage.productName.first()).toHaveText(item.title);
      await expect(cartPage.productName.last()).toHaveText(item2.title);

      await expect(cartPage.qtyInput.first()).toHaveValue('1');
      await expect(cartPage.qtyInput.last()).toHaveValue('4');
    },
  );
});
