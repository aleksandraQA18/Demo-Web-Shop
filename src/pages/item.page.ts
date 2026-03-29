import { BasePage } from './base.page';
import { Locator, Page } from '@playwright/test';

export class ItemPage extends BasePage {
  addToCartButton: Locator;

  constructor(page: Page) {
    super(page);
    this.addToCartButton = this.page.locator('.add-to-cart-button');
  }

  async clickAddToCartButton(): Promise<void> {
    await this.addToCartButton.click();
  }
}
