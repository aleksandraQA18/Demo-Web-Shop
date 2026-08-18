import { TopMenuComponent } from '@_src/components/top.menu.components';
import { BasePage } from '@_src/pages/base.page';
import { CheckoutSignInPage } from '@_src/pages/checkout.signin.page';
import { Locator, Page } from '@playwright/test';

export class CartPage extends BasePage {
  topMenu: TopMenuComponent;
  productName: Locator;
  productUnitPrice: Locator;
  productSubtotal: Locator;
  qtyInput: Locator;
  updateButton: Locator;
  itemCheckbox: Locator;
  orderContent: Locator;
  checkoutButton: Locator;
  agreeTermCheckbox: Locator;

  constructor(protected page: Page) {
    super(page);
    this.topMenu = new TopMenuComponent(page);
    this.productName = this.page.locator('.product-name');
    this.productUnitPrice = this.page.locator('.product-unit-price');
    this.productSubtotal = this.page.locator('.product-subtotal');
    this.qtyInput = this.page.locator('.qty-input');
    this.updateButton = this.page.locator('.update-cart-button');
    this.itemCheckbox = this.page.locator('//input[@name="removefromcart"]');
    this.orderContent = this.page.locator('.order-summary-content');
    this.checkoutButton = this.page.locator('#checkout');
    this.agreeTermCheckbox = this.page.locator('#termsofservice');
  }

  async editItemQty(quantity: string, index: number = 0): Promise<void> {
    await this.qtyInput.nth(index).clear();
    await this.qtyInput.nth(index).fill(quantity);
    await this.updateButton.click();
  }

  async deleteItem(index: number = 0): Promise<void> {
    const item = this.itemCheckbox.nth(index);
    await item.click();
    await this.updateButton.click();
  }

  async userCheckout(): Promise<CheckoutSignInPage> {
    await this.agreeTermCheckbox.check();
    await this.checkoutButton.click();
    return new CheckoutSignInPage(this.page);
  }
}
