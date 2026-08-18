import { expect, test } from '@_src/fixtures/merged.fixtures';
import { Product } from '@_src/models/product.model';
import { CategoryPage } from '@_src/pages/category.page';
import { ProductPage } from '@_src/pages/product.page';
import { products } from '@_src/test-data/products';

test.describe('Product Details', () => {
  let product: Product;
  let productPage: ProductPage;

  test.beforeEach(async ({ getProductAndNavigate }) => {
    const productContext = await getProductAndNavigate('books');
    product = productContext.product;
    productPage = productContext.productPage;
  });

  test(
    'DWS-301 Product details page displays correct data',
    { tag: '@smoke' },
    async () => {
      //Arrange
      const expectedPrice = product.price.toFixed(2);

      //Assert
      await expect(productPage.productName).toHaveText(product.title);
      await expect(productPage.currentPrice).toHaveText(expectedPrice);
    },
  );

  test(
    'DWS-302 Product price matches the listing page',
    { tag: '@regression' },
    async ({ page }) => {
      //Arrange
      const productPrice = await productPage.currentPrice.innerText();
      const categoryPage = new CategoryPage(page);

      //Act
      await productPage.mainMenu.selectBooks();
      const listingProduct = await categoryPage.getItemDetails(product.title);

      //Assert
      expect(listingProduct.price).toEqual(productPrice);
    },
  );

  test(
    'DWS-303 User can add an available product to cart',
    { tag: '@smoke' },
    async () => {
      //Arrange
      const expectedCartQty = 'Quantity: 1';
      //Act
      await productPage.clickAddToCartButton();

      //Assert
      await expect(productPage.topMenu.miniCartProductQty).toHaveText(
        expectedCartQty,
      );
    },
  );

  test(
    'DWS-304 Cart counter is updated after adding a product',
    { tag: '@smoke' },
    async () => {
      //Arrange
      const expectedCartQty = 'Quantity: 2';
      //Act
      await productPage.clickAddToCartButton();

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
