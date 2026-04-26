import { CategoryPage } from '../../src/pages/category.page';
import { products } from '../../src/test-data/products';
import test, { expect } from '@playwright/test';

test.describe('Category & Product Listing', () => {
  let categoryPage: CategoryPage;

  test.beforeEach(async ({ page }) => {
    categoryPage = new CategoryPage(page);
  });

  for (const product of products) {
    test(
      `DWS-201 Should display correct details for product ${product.title}`,
      { tag: '@regression' },
      async () => {
        // Arrange
        const expectedPrice = product.price.toFixed(2);

        // Act
        await categoryPage.goto(product.categoryUrl);
        const itemDetails = await categoryPage.getItemDetails(product.title);

        // Assert
        expect(itemDetails.title).toEqual(product.title);
        expect(itemDetails.price).toEqual(expectedPrice);
      },
    );
  }

  test(
    'DWS-202 Product is clickable and opens product details page',
    { tag: '@smoke' },
    async () => {
      // Arrange
      const bookProduct = products.find((p) => p.categoryUrl === 'books');
      expect(bookProduct).toBeDefined();

      // Act
      await categoryPage.goto(bookProduct!.categoryUrl);
      const itemPage = await categoryPage.clickItemPicture(bookProduct!.title);

      // Assert
      const url = await itemPage.getUrl();
      expect(url).toContain(bookProduct!.url);
      await expect(itemPage.productName).toHaveText(bookProduct!.title);
    },
  );

  test(
    'DWS-203 Out-of-stock product cannot be added to cart',
    { tag: '@smoke' },
    async () => {
      // Arrange
      const productOutOfStock = products.find((p) => !p.inStock);
      expect(productOutOfStock).toBeDefined();

      // Act
      await categoryPage.goto(productOutOfStock!.categoryUrl);
      const item = await categoryPage.getItemByTitle(productOutOfStock!.title);

      // Assert
      await expect(item.locator(categoryPage.addToCartButton)).toBeHidden();
    },
  );

  test(
    'DWS-204 User can add product to cart directly from listing',
    { tag: '@smoke' },
    async () => {
      // Arrange
      const bookProduct = products.find(
        (p) => p.categoryUrl === 'books' && p.inStock,
      );
      expect(bookProduct).toBeDefined();
      const expectedNotification =
        'The product has been added to your shopping cart';

      // Act
      await categoryPage.goto(bookProduct!.categoryUrl);
      await categoryPage.clickAddToCart(bookProduct!.title);

      // Assert
      await expect(categoryPage.notificationBar).toHaveText(
        expectedNotification,
      );
      await expect(categoryPage.topMenu.shoppingCartQty).toHaveText('(1)');
    },
  );

  test(
    'DWS-205 Pagination / sorting does not break product visibility',
    { tag: '@regression' },
    async () => {
      // Arrange
      const productData = products.find(
        (p) => p.categoryUrl === 'apparel-shoes',
      );
      expect(productData).toBeDefined();
      const sortValue = 'Name: Z to A';
      const productsPerPage = 4;

      // Act
      await categoryPage.goto(productData!.categoryUrl);
      const categoryProductsCount = await categoryPage.itemDetails.count();

      // Act & Assert: Sort
      await test.step(`sorting products by ${sortValue}`, async () => {
        await categoryPage.sortProducts(sortValue);
        await expect(categoryPage.itemDetails).toHaveCount(
          categoryProductsCount,
        );
      });

      // Act & Assert: Pagination
      await test.step(`page display ${productsPerPage} products on page`, async () => {
        await categoryPage.selectItemsPerPage(String(productsPerPage));
        await expect(categoryPage.itemDetails).toHaveCount(productsPerPage);
      });
    },
  );

  test(
    'DWS-206 Mini cart should display correct product name',
    { tag: '@regression' },
    async () => {
      // Arrange
      const productData = products.find(
        (p) => p.categoryUrl === 'cell-phones' && p.inStock,
      );
      expect(productData).toBeDefined();

      // Act
      await categoryPage.goto(productData!.categoryUrl);
      await categoryPage.clickAddToCart(productData!.title);

      // Assert
      await expect(categoryPage.topMenu.miniCartProductName).toHaveText(
        productData!.title,
      );
    },
  );

  test(
    'DWS-207 Mini cart should display correct price and quantity',
    { tag: '@regression' },
    async () => {
      // Arrange
      const productData = products.find(
        (p) => p.categoryUrl === 'cell-phones' && p.inStock,
      );
      expect(productData).toBeDefined();
      const itemPrice = productData!.price.toFixed(2);

      // Act
      await categoryPage.goto(productData!.categoryUrl);
      await categoryPage.clickAddToCart(productData!.title);

      // Assert
      await expect(categoryPage.topMenu.miniCartProductPrice).toContainText(
        itemPrice,
      );
      await expect(categoryPage.topMenu.miniCartProductQty).toContainText('1');
    },
  );
});
