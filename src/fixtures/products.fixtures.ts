import { Product } from '@_src/models/product.model';
import { ProductPage } from '@_src/pages/product.page';
import { products } from '@_src/test-data/products';
import { test as baseTest, expect } from '@playwright/test';

interface GetProductContext {
  product: Product;
  productPage: ProductPage;
}
interface ProductFixtures {
  getProduct: (category: string) => Product;
  getProductAndNavigate: (category: string) => Promise<GetProductContext>;
  getProductOutOfStock: () => Product;
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
    ): Promise<GetProductContext> => {
      const product = getProduct(category);
      await page.goto(product.url);
      const productPage = new ProductPage(page);
      return { product, productPage };
    };
    await use(goToProduct);
  },
  getProductOutOfStock: async ({}, use) => {
    const productOutOfStock = (): Product => {
      const product = products.find((p) => p.inStock === false);
      expect(product, `No out-of-stock product was found`).toBeDefined();
      return product!;
    };
    await use(productOutOfStock);
  },
});
