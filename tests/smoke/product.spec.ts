import { Product } from '../../src/models/product.model';
import { CategoryPage } from '../../src/pages/category.page';
import { ProductPage } from '../../src/pages/product.page';
import { products } from '../../src/test-data/products';
import test, { expect } from '@playwright/test';

test.describe('Product Details', () => {
  let bookProduct: Product;
  let productPage: ProductPage;

  test.beforeEach(async ({ page }) => {
    bookProduct = products.find((p) => p.categoryUrl === 'books')!;
    expect(bookProduct).toBeDefined();
    productPage = new ProductPage(page);
    await productPage.goto(bookProduct.url);
  });

  test(
    'DWS-301 Product details page displays correct data',
    { tag: '@smoke' },
    async () => {
      //Arrange
      const expectedPrice = bookProduct.price.toFixed(2);

      //Assert
      await expect(productPage.productName).toHaveText(bookProduct.title);
      await expect(productPage.currentPrice).toHaveText(expectedPrice);
    },
  );

  test(
    'DWS-302 Product price is consistent with listing page',
    { tag: '@regression' },
    async ({ page }) => {
      //Arrange
      const productPrice = await productPage.currentPrice.innerText();
      const categoryPage = new CategoryPage(page);

      //Act
      await productPage.mainMenu.clickMainMenuCategory(bookProduct.categoryUrl);
      const listingProduct = await categoryPage.getItemDetails(
        bookProduct.title,
      );

      //Assert
      expect(listingProduct.price).toEqual(productPrice);
    },
  );

  test(
    'DWS-303 User can add available product to cart from product page',
    { tag: '@smoke' },
    async () => {
      //Arrange
      const expectedCartQty = 'Quantity: 1';
      //Act
      await productPage.clickAddToCartButton();

      //Assert
      await expect(productPage.notificationBar).toBeVisible();
      await expect(productPage.topMenu.miniCartProductQty).toHaveText(
        expectedCartQty,
      );
    },
  );

  test(
    'DWS-304 Adding product updates cart counter correctly',
    { tag: '@smoke' },
    async () => {
      //Arrange
      const expectedCartQty = 'Quantity: 2';
      //Act
      await productPage.clickAddToCartButton();
      await expect.soft(productPage.notificationBar).toBeVisible();

      await expect.soft(productPage.notificationBar).toBeHidden();

      await productPage.clickAddToCartButton();

      //Assert
      await expect(productPage.topMenu.miniCartProductQty).toHaveText(
        expectedCartQty,
      );
      await expect(productPage.topMenu.shoppingCartQty).toHaveText('(2)');
    },
  );

  test(
    'DWS-305 Product availability affects "Add to cart" behavior',
    { tag: '@regression' },
    async () => {
      //Arrange
      const productOutOfStock = products.find((p) => !p.inStock);
      expect(productOutOfStock).toBeDefined();

      //Act
      await productPage.goto(productOutOfStock!.url);

      //Assert
      await expect(productPage.addToCartButton).toBeHidden();
    },
  );
});
