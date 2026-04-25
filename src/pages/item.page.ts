import { BasePage } from './base.page';
import { CartPage } from './cart.page';
import { Locator, Page } from '@playwright/test';

export class ItemPage extends BasePage {
  addToCartButton: Locator;
  notificationBar: Locator;

  constructor(page: Page) {
    super(page);
    this.addToCartButton = this.page.locator('.add-to-cart-button');
    this.notificationBar = this.page.locator('#bar-notification .content');
  }

  async clickAddToCartButton(): Promise<void> {
    await this.addToCartButton.click();
  }

  async goToShoppingCart(): Promise<CartPage> {
    await this.topMenu.shoppingCartLink.click();
    return new CartPage(this.page);
  }
}
