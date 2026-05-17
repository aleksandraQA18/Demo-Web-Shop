import { expect, test } from '@_src/fixtures/merged.fixtures';
import { Product } from '@_src/models/product.model';
import { CartPage } from '@_src/pages/cart.page';
import { ProductPage } from '@_src/pages/product.page';

test.describe('Cart Management', () => {
  let productPage: ProductPage;
  let product: Product;
  let cartPage: CartPage;

  test.beforeEach(async ({ getProductAndNavigate }) => {
    ({ product, productPage } = await getProductAndNavigate('books'));
    await productPage.clickAddToCartButton();
    cartPage = await productPage.topMenu.selectCart();
  });

  test(
    'DWS-401 Cart reflects correct price and quantity',
    { tag: '@regression' },
    async () => {
      // Arrange
      const expectedTitle = product.title;
      const expectedPrice = product.price.toFixed(2);

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
      const itemPrice = product.price;
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
    async ({ getProductAndNavigate }) => {
      //Arrange
      const { product: secondProduct, productPage } =
        await getProductAndNavigate('cell-phones');

      //Act - add and edit second product
      await productPage.clickAddToCartButton();
      cartPage = await productPage.topMenu.selectCart();
      await cartPage.editItemQty('4', 1);

      //verify if quantity is updated
      await expect.soft(cartPage.qtyInput.last()).toHaveValue('4');

      //reload a page
      await cartPage.reloadPage();

      //Assert
      await expect(cartPage.productName.first()).toHaveText(product.title);
      await expect(cartPage.productName.last()).toHaveText(secondProduct.title);

      await expect(cartPage.qtyInput.first()).toHaveValue('1');
      await expect(cartPage.qtyInput.last()).toHaveValue('4');
    },
  );
});
