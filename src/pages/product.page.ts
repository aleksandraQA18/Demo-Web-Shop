import { BasePage } from './base.page';
import { Locator, Page, expect } from '@playwright/test';

export class ProductPage extends BasePage {
  addToCartButton: Locator;
  notificationBar: Locator;
  productName: Locator;
  inStock: Locator;
  currentPrice: Locator;

  constructor(page: Page) {
    super(page);
    this.addToCartButton = this.page.locator('.add-to-cart-button');
    this.notificationBar = this.page.locator('#bar-notification .content');
    this.productName = this.page.locator('.product-name h1');
    this.inStock = this.page.locator('.stock');
    this.currentPrice = this.page.locator('[itemprop="price"]');
  }

  async clickAddToCartButton(): Promise<void> {
    await this.addToCartButton.click();
    await expect(this.notificationBar).toBeVisible();
  }
}
