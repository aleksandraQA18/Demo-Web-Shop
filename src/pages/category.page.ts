import { BasePage } from '@_src/pages/base.page';
import { ProductPage } from '@_src/pages/product.page';
import { Locator, Page } from '@playwright/test';

export class CategoryPage extends BasePage {
  productItem: Locator;
  itemDetails: Locator;
  itemPicture: Locator;
  notificationBar: Locator;
  shoppingCartNotification: Locator;
  addToCartButton: Locator;
  sortDropdown: Locator;
  pageSize: Locator;

  constructor(page: Page) {
    super(page);
    this.productItem = this.page.locator('.product-item');
    this.itemDetails = this.page.locator('.details');
    this.itemPicture = this.page.locator('.picture');
    this.notificationBar = this.page.locator('#bar-notification .content');
    this.shoppingCartNotification = this.notificationBar.locator('a');
    this.addToCartButton = this.page.locator('.product-box-add-to-cart-button');
    this.sortDropdown = this.page.locator('#products-orderby');
    this.pageSize = this.page.locator('#products-pagesize');
  }

  async getItemByTitle(title: string): Promise<Locator> {
    return this.productItem.filter({
      has: this.page.locator('.product-title a', {
        hasText: new RegExp(`^${title}$`),
      }),
    });
  }

  async getItemDetails(title: string): Promise<{
    title: string;
    price: string;
  }> {
    const item = await this.getItemByTitle(title);
    const itemTitle = await item.locator('.product-title a').innerText();
    const itemPrice = await item.locator('.actual-price').innerText();
    return {
      title: itemTitle,
      price: itemPrice,
    };
  }

  async clickAddToCart(title: string): Promise<void> {
    const item = await this.getItemByTitle(title);
    await item.locator(this.addToCartButton).click();
  }

  async clickItemPicture(title: string): Promise<ProductPage> {
    const item = await this.getItemByTitle(title);
    await item.locator(this.itemPicture).click();
    return new ProductPage(this.page);
  }

  async isProductsGridLoaded(): Promise<boolean> {
    const gridLocator = this.page.locator('.product-grid, .sub-category-grid');
    return (await gridLocator.count()) > 0;
  }

  async goToProductPage(item: Locator): Promise<ProductPage> {
    await item.locator('a').click();
    return new ProductPage(this.page);
  }

  async sortProducts(value: string): Promise<void> {
    await this.sortDropdown.selectOption(value);
  }

  async selectItemsPerPage(value: string): Promise<void> {
    await this.pageSize.selectOption(value);
  }
}
