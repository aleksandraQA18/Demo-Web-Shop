import { BasePage } from './base.page';
import { Locator, Page } from '@playwright/test';

export class CartPage extends BasePage {
  productName: Locator;
  productUnitPrice: Locator;
  productSubtotal: Locator;
  qtyInput: Locator;
  updateButton: Locator;
  itemCheckbox: Locator;
  orderContent: Locator;

  constructor(protected page: Page) {
    super(page);
    this.productName = this.page.locator('.product-name');
    this.productUnitPrice = this.page.locator('.product-unit-price');
    this.productSubtotal = this.page.locator('.product-subtotal');
    this.qtyInput = this.page.locator('.qty-input');
    this.updateButton = this.page.locator('.update-cart-button');
    this.itemCheckbox = this.page.locator('//input[@name="removefromcart"]');
    this.orderContent = this.page.locator('.order-summary-content');
  }

  async editItemQty(quantity: string): Promise<void> {
    await this.qtyInput.clear();
    await this.qtyInput.fill(quantity);
    await this.updateButton.click();
  }

  async deleteItem(index: number = 0): Promise<void> {
    const item = this.itemCheckbox.nth(index);
    await item.click();
    await this.updateButton.click();
  }
}
