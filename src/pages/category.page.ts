import { BasePage } from './base.page';
import { Locator, Page } from '@playwright/test';

export class CategoryPage extends BasePage {
  itemDetails: Locator;
  notificationBar: Locator;
  shoppingCart: Locator;
  cartItemQty: Locator;
  shoppingCartName: Locator;
  shoppingUnitPrice: Locator;
  shoppingQty: Locator;

  constructor(page: Page) {
    super(page);
    this.itemDetails = this.page.locator('.details');
    this.notificationBar = this.page.locator('#bar-notification .content');
    this.shoppingCart = this.page.locator('.mini-shopping-cart');
    this.cartItemQty = this.page.locator('.cart-qty');
    this.shoppingCartName = this.shoppingCart.locator('.name a');
    this.shoppingUnitPrice = this.shoppingCart.locator('.price span');
    this.shoppingQty = this.shoppingCart.locator('.quantity span');
  }

  async getItemWithAddToCart(): Promise<Locator> {
    const items = this.itemDetails.filter({
      has: this.page.locator('.product-box-add-to-cart-button'),
    });
    return items.first();
  }

  async getItemTitle(item: Locator): Promise<string> {
    return item.locator('.product-title').innerText();
  }

  async getItemActualPrice(item: Locator): Promise<string> {
    return item.locator('.price.actual-price').innerText();
  }

  async clickAddToCart(item: Locator): Promise<void> {
    await item.locator('.product-box-add-to-cart-button').click();
  }
}
