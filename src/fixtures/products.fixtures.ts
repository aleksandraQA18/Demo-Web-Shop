import { Product } from '@_src/models/product.model';
import { ProductPage } from '@_src/pages/product.page';
import { products } from '@_src/test-data/products';
import { test as baseTest, expect } from '@playwright/test';

interface ProductFixtures {
  getProduct: (category: string) => Product;
  getProductAndNavigate: (
    category: string,
  ) => Promise<{ product: Product; productPage: ProductPage }>;
}

export const productsTest = baseTest.extend<ProductFixtures>({
  getProduct: async ({}, use) => {
    const getProductDetails = (category: string): Product => {
      const product = products.find(
        (product) =>
          product.categoryUrl === category && product.inStock === true,
      );
      expect(
        product,
        `No in-stock product found for category: ${category}`,
      ).toBeDefined();
      return product!;
    };
    await use(getProductDetails);
  },
  getProductAndNavigate: async ({ page, getProduct }, use) => {
    const goToProduct = async (
      category: string,
    ): Promise<{ product: Product; productPage: ProductPage }> => {
      const productDetails = getProduct(category);
      await page.goto(productDetails.url);
      const productPage = new ProductPage(page);
      return { product: productDetails, productPage };
    };
    await use(goToProduct);
  },
});
